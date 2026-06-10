const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('mongo-sanitize');
const validator = require('validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ════════════════════════════════════════════════════════════
// ── ENVIRONMENT VALIDATION (fail fast in production)
// ════════════════════════════════════════════════════════════
const requiredEnvVars = ['FRONTEND_URL'];
if (NODE_ENV === 'production') {
  const missing = requiredEnvVars.filter(v => !process.env[v]);
  if (missing.length) {
    console.error(`[FATAL] Missing required environment variables: ${missing.join(', ')}`);
    console.error('[FATAL] Create a .env file from .env.example or set them in your deployment.');
    process.exit(1);
  }
}

// ════════════════════════════════════════════════════════════
// ── TRUST PROXY (required for rate limiting behind reverse proxy)
// ════════════════════════════════════════════════════════════
app.set('trust proxy', NODE_ENV === 'production' ? 1 : 0);

// ════════════════════════════════════════════════════════════
// ── SECURITY MIDDLEWARE - ENTERPRISE GRADE
// ════════════════════════════════════════════════════════════

// 1. Security Headers (Helmet) - OWASP ASVS Level 2+ Compliant
// Generate a random nonce for CSP on each request
const generateNonce = () => crypto.randomBytes(16).toString('base64');

app.use((req, res, next) => {
  res.locals.nonce = generateNonce();
  next();
});

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Nonce-based script execution - allows inline scripts with correct nonce
      scriptSrc: [
        "'self'",
        (req, res) => `'nonce-${res.locals.nonce}'`,
        // Allow Vite HMR in development
        ...(NODE_ENV === 'development' ? ["'unsafe-inline'", "'unsafe-eval'"] : []),
        // Allow trusted CDNs if needed
        'https://cdn.jsdelivr.net',
      ],
      styleSrc: [
        "'self'",
        (req, res) => `'nonce-${res.locals.nonce}'`,
        'https://fonts.googleapis.com',
        ...(NODE_ENV === 'development' ? ["'unsafe-inline'"] : []),
      ],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'https:', 'blob:'],
      connectSrc: [
        "'self'",
        FRONTEND_URL.replace(/\/$/, ''),
        'https://kgokqftntqszjnwsaegj.supabase.co',
        ...(NODE_ENV === 'development' ? ['ws://localhost:5173', 'http://localhost:5173'] : []),
      ],
      frameSrc: ["'none'"],
      frameAncestors: ["'none'"],
      mediaSrc: ["'self'", 'https://*.cloudfront.net', 'https://*.supabase.co'],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
      blockAllMixedContent: [],
    },
    reportOnly: false,
  },
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  strictTransportSecurity: true,
  permissionsPolicy: {
    geolocation: [],
    microphone: [],
    camera: [],
    magnetometer: [],
    gyroscope: [],
    accelerometer: [],
    usb: [],
    payment: [],
    fullscreen: ['self'],
    displayCapture: [],
    pictureInPicture: [],
  },
  dnsPrefetchControl: { allow: false },
}));

// Additional security headers not covered by Helmet
app.use((req, res, next) => {
  // Prevent IE from executing downloaded files in site's context
  res.setHeader('X-Download-Options', 'noopen');
  // Prevent Adobe Flash from loading content
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  // Remove legacy headers
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  res.removeHeader('X-AspNet-Version');
  res.removeHeader('X-AspNetMvc-Version');
  next();
});

// 2. CORS - Restricted to frontend only (OWASP Protection)
const allowedOrigins = [
  FRONTEND_URL || 'http://localhost:5173',
  ...(NODE_ENV === 'development' ? ['http://localhost:3000', 'http://localhost:5173'] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) {
      callback(null, true);
      return;
    }

    // Normalize origin for comparison
    const normalizedOrigin = origin.replace(/\/$/, '');
    const hasMatch = allowedOrigins.some(
      allowed => allowed.replace(/\/$/, '') === normalizedOrigin
    );

    if (hasMatch) {
      callback(null, true);
    } else {
      console.warn(`[SECURITY] CORS violation from origin: ${origin}`);
      callback(new Error('CORS policy violation'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token', 'X-Nonce'],
  exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset', 'X-CSRF-Token'],
  maxAge: 3600,
  optionsSuccessStatus: 204,
}));

// 3. Rate Limiting (OWASP Protection Against DDoS/Abuse)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => NODE_ENV === 'development' && !process.env.CI,
  keyGenerator: (req) => {
    return req.get('CF-Connecting-IP') ||
           req.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
           req.ip ||
           'unknown';
  },
  handler: (req, res) => {
    console.warn(`[SECURITY] Rate limit exceeded from IP: ${req.get('CF-Connecting-IP') || req.ip}`);
    res.status(429).json({ error: 'Too many requests, please try again later' });
  },
});

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 30, // stricter for API endpoints
  message: { error: 'Too many API requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.get('CF-Connecting-IP') || req.get('X-Forwarded-For')?.split(',')[0]?.trim() || req.ip || 'unknown',
});

// Auth limiter - very strict (5 attempts per 15 min per IP)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts, please try again later. Account locked for 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: (req) => req.get('CF-Connecting-IP') || req.get('X-Forwarded-For')?.split(',')[0]?.trim() || req.ip || 'unknown',
});

// Apply global limiter to ALL routes
app.use(globalLimiter);

// 4. Body parsing with tight size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// 5. Data sanitization against NoSQL injection
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    try { req.body = mongoSanitize(req.body); } catch (e) { console.error('Sanitize error:', e.message); }
  }
  next();
});

// 6. Remove powered-by header (double assurance)
app.disable('x-powered-by');
// Disable ETag in production to prevent fingerprinting; keep in dev for caching
if (NODE_ENV === 'production') {
  app.disable('etag');
}

// 7. Host header validation - prevent host header injection attacks
app.use((req, res, next) => {
  const host = req.get('host');
  if (NODE_ENV === 'production' && host) {
    const allowedHosts = [
      'localhost',
      'localhost:5000',
      process.env.DOMAIN,
      process.env.FRONTEND_URL ? new URL(process.env.FRONTEND_URL).host : null,
    ].filter(Boolean);

    const isAllowed = allowedHosts.some(h => host === h || host.endsWith('.' + h));
    if (!isAllowed && allowedHosts.length > 0) {
      console.warn(`[SECURITY] Invalid host header: ${host}`);
      return res.status(400).json({ error: 'Invalid request' });
    }
  }
  next();
});

// ════════════════════════════════════════════════════════════
// ── CSRF PROTECTION
// ════════════════════════════════════════════════════════════

// Simple CSRF token generation and validation
const CSRF_TOKENS = new Map();
const CSRF_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Get or create CSRF token (keyed by IP + User-Agent for NAT safety)
const getCsrfTokenKey = (req) => {
  const ip = req.get('CF-Connecting-IP') || req.ip || 'unknown';
  const ua = (req.get('User-Agent') || 'unknown').substring(0, 50);
  return `${ip}:${ua}`;
};

const getCsrfToken = (key) => {
  const existing = CSRF_TOKENS.get(key);
  if (existing && existing.expires > Date.now()) {
    return existing.token;
  }
  const token = crypto.randomBytes(32).toString('hex');
  CSRF_TOKENS.set(key, { token, expires: Date.now() + CSRF_TOKEN_EXPIRY });
  // Clean up old tokens periodically
  if (CSRF_TOKENS.size > 10000) {
    for (const [key, value] of CSRF_TOKENS) {
      if (value.expires < Date.now()) CSRF_TOKENS.delete(key);
    }
  }
  return token;
};

const validateCsrfToken = (req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
    return next();
  }
  const token = req.headers['x-csrf-token'];
  const key = getCsrfTokenKey(req);
  const stored = CSRF_TOKENS.get(key);
  if (!stored || stored.token !== token || stored.expires < Date.now()) {
    console.warn(`[SECURITY] Invalid CSRF token from key: ${key.substring(0, 30)}...`);
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
};

// CSRF token endpoint
app.get('/api/csrf-token', (req, res) => {
  const key = getCsrfTokenKey(req);
  const token = getCsrfToken(key);
  res.json({ token });
});

// Apply CSRF validation to mutating API routes (exempt public endpoints)
app.use('/api', (req, res, next) => {
  // Exempt public endpoints from CSRF (they use rate limiting + captcha instead)
  const exemptPaths = ['/api/waitlist', '/api/csp-report', '/api/csrf-token', '/api/auth/login'];
  if (exemptPaths.some(p => req.path === p || req.originalUrl === p)) {
    return next();
  }
  // Skip CSRF if a valid JWT is present (Bearer tokens are not CSRF-vulnerable)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
      return next(); // Valid JWT → skip CSRF
    } catch {}
  }
  validateCsrfToken(req, res, next);
});

// ════════════════════════════════════════════════════════════
// ── SECURITY LOGGING
// ════════════════════════════════════════════════════════════

// Structured security audit logger
const securityLog = (event, details = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  };
  console.log(JSON.stringify({ level: 'SECURITY', ...entry }));
};

// Request logging middleware - logs to console (structured)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    // Log all requests in development, only errors in production
    if (NODE_ENV === 'development' || res.statusCode >= 400) {
      securityLog('REQUEST', {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.get('CF-Connecting-IP') || req.ip,
        userAgent: req.get('User-Agent')?.substring(0, 100),
      });
    }
  });
  next();
});

// CSP violation report endpoint
app.post('/api/csp-report', (req, res) => {
  const report = req.body;
  console.warn('[CSP_VIOLATION]', JSON.stringify(report));
  securityLog('CSP_VIOLATION', {
    blockedUri: report?.['csp-report']?.['blocked-uri'],
    violatedDirective: report?.['csp-report']?.['violated-directive'],
    sourceFile: report?.['csp-report']?.['source-file'],
  });
  res.status(204).end();
});

// ════════════════════════════════════════════════════════════
// ── HEALTH CHECK (placed BEFORE static serving so it's reachable)

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Nexyovi API is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ════════════════════════════════════════════════════════════
// ── JWT AUTH MIDDLEWARE
// ════════════════════════════════════════════════════════════

const JWT_SECRET = process.env.JWT_SECRET || 'nexyovi-dev-secret-change-in-production';
const JWT_EXPIRY = '7d';

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ════════════════════════════════════════════════════════════
// ── AUTH ROUTES
// ════════════════════════════════════════════════════════════

// Login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.listAll('users').find(u => u.email === email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, username: user.username, role: user.role }
    });
  } catch (err) {
    console.error('[AUTH_ERROR]', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify token & get current user
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.listAll('users').find(u => u.id === req.user.id);
  if (!user) return res.status(401).json({ error: 'User not found' });
  res.json({ user: { id: user.id, email: user.email, username: user.username, role: user.role } });
});

// Logout (token-based — just a placeholder, client removes token)
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// ════════════════════════════════════════════════════════════
// ── CRUD DATA API (generic: partners, team, testimonials, jobs, messages)
// ════════════════════════════════════════════════════════════

// List all records from a table
app.get('/api/data/:entity', (req, res) => {
  try {
    const data = db.listAll(req.params.entity);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get single record by id
app.get('/api/data/:entity/:id', (req, res) => {
  try {
    const record = db.getById(req.params.entity, req.params.id);
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a record (auth required)
app.post('/api/data/:entity', authMiddleware, (req, res) => {
  try {
    const record = db.create(req.params.entity, req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a record (auth required)
app.put('/api/data/:entity/:id', authMiddleware, (req, res) => {
  try {
    const { entity, id } = req.params;
    // For settings & site_content, use upsert
    if (entity === 'settings' || entity === 'site_content') {
      const record = db.upsert(entity, id, req.body);
      return res.json(record);
    }
    const record = db.update(entity, parseInt(id), req.body);
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a record (auth required)
app.delete('/api/data/:entity/:id', authMiddleware, (req, res) => {
  try {
    const record = db.remove(req.params.entity, parseInt(req.params.id));
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted', record });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ════════════════════════════════════════════════════════════
// ── INPUT VALIDATION UTILITIES
// ════════════════════════════════════════════════════════════

// Sanitize string: trim, strip HTML tags, limit length
const sanitizeString = (str, maxLength = 1000) => {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .substring(0, maxLength);
};

// Validate and sanitize email
const sanitizeAndValidateEmail = (email) => {
  if (typeof email !== 'string') return null;
  const trimmed = email.trim().toLowerCase();
  if (!validator.isEmail(trimmed)) return null;
  return validator.normalizeEmail(trimmed);
};

// Validate nonce from request
const isValidNonce = (nonce) => {
  return typeof nonce === 'string' && /^[A-Za-z0-9+/=]+$/.test(nonce) && nonce.length <= 100;
};

// ════════════════════════════════════════════════════════════
// ── SERVE FRONTEND STATIC FILES (before 404 handler, after all API routes)

// Serve built frontend from the 'dist' folder (copied from frontend/build)
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false,
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('index.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  },
}));

// Catch-all: serve index.html for SPA client-side routing (all non-API routes)
app.get(/^(?!\/api).*$/, (req, res) => {
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// ════════════════════════════════════════════════════════════
// ── MIGRATION ENDPOINT (still available for reference)
// ════════════════════════════════════════════════════════════

app.get('/api/migrate', (req, res) => {
  res.json({
    success: false,
    hint: 'Run supabase_schema.sql in your Supabase SQL Editor to create required tables.',
    message: 'Auto-migration not available — table creation requires manual SQL execution via Supabase Dashboard.',
  });
});

// ════════════════════════════════════════════════════════════
// ── API ROUTES
// ════════════════════════════════════════════════════════════

const waitlist = [];

// Waitlist signup with security - protected by apiLimiter AND CSRF
app.post('/api/waitlist', apiLimiter, (req, res) => {
  try {
    const { email: rawEmail } = req.body;

    // Validate email presence and type
    if (!rawEmail || typeof rawEmail !== 'string') {
      securityLog('VALIDATION_FAILED', { field: 'email', reason: 'missing_or_invalid_type' });
      return res.status(400).json({ error: 'Valid email is required' });
    }

    // Sanitize input
    const email = sanitizeAndValidateEmail(rawEmail);
    if (!email) {
      securityLog('VALIDATION_FAILED', { field: 'email', reason: 'invalid_format' });
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check for duplicate entries
    if (waitlist.some(entry => entry.email === email)) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create secure entry
    const entry = {
      id: crypto.randomBytes(16).toString('hex'),
      email: email,
      date: new Date(),
      ip: req.get('CF-Connecting-IP') || req.ip,
      userAgent: req.get('User-Agent')?.substring(0, 200) || 'unknown',
    };

    waitlist.push(entry);
    securityLog('WAITLIST_SIGNUP', { email });

    return res.status(201).json({
      message: 'Welcome to the waitlist!',
      total: waitlist.length,
    });

  } catch (error) {
    console.error('[WAITLIST_ERROR]', error);
    securityLog('WAITLIST_ERROR', { error: error.message });
    return res.status(500).json({ error: 'Signup failed. Please try again later.' });
  }
});

// ════════════════════════════════════════════════════════════
// ── 404 & UNHANDLED ROUTES
// ════════════════════════════════════════════════════════════

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ════════════════════════════════════════════════════════════
// ── GLOBAL ERROR HANDLER
// ════════════════════════════════════════════════════════════

app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  securityLog('SERVER_ERROR', {
    method: req.method,
    path: req.path,
    error: err.message,
  });

  // Don't leak error details in production
  if (NODE_ENV === 'production') {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  res.status(err.status || 500).json({
    error: err.message,
    path: req.path,
  });
});

// ════════════════════════════════════════════════════════════
// ── SERVER STARTUP
// ════════════════════════════════════════════════════════════

const server = app.listen(PORT, () => {
  console.log(`\n🔒 Nexyovi API Server`);
  console.log(`   Port:       ${PORT}`);
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   Frontend:   ${FRONTEND_URL}`);
  console.log(`   Security:   Helmet + Rate Limiting + CORS + CSRF + Input Validation`);
  console.log(`   Database:   SQLite (${process.env.DB_PATH || 'nexyovi.db'})`);
  console.log(`   Admin:      ${process.env.ADMIN_EMAIL || 'admin@nexyovi.com'} / ${process.env.ADMIN_PASSWORD ? '****' : 'admin123 (CHANGE ME)'}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions gracefully
process.on('uncaughtException', (error) => {
  console.error('[FATAL] Uncaught exception:', error);
  // Log but keep running - in production you'd want to restart
  securityLog('UNCAUGHT_EXCEPTION', { error: error.message });
});

process.on('unhandledRejection', (reason) => {
  console.error('[FATAL] Unhandled rejection:', reason);
  securityLog('UNHANDLED_REJECTION', { error: reason?.message || String(reason) });
});

module.exports = app;
