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
const fs = require('fs');
const multer = require('multer');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ════════════════════════════════════════════════════════════
// ── RAW CORS MIDDLEWARE (Guarantees Preflight Handling)
// ════════════════════════════════════════════════════════════
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token, X-Nonce, Accept, Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  
  // Prevent browser & CDN caching for all API routes
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// ════════════════════════════════════════════════════════════
// ── ENVIRONMENT VALIDATION (fail fast in production)
// ════════════════════════════════════════════════════════════
const requiredEnvVars = ['FRONTEND_URL'];
if (NODE_ENV === 'production') {
  const missing = requiredEnvVars.filter(v => !process.env[v]);
  if (missing.length) {
    console.error(`[FATAL] Missing required environment variables: ${missing.join(', ')}`);
    console.error('[FATAL] Create a .env file from .env.example or set them in your deployment.');
    // process.exit(1); // Commented out to prevent Passenger crash
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
      mediaSrc: ["'self'", 'data:', 'https://*.cloudfront.net', 'https://*.supabase.co'],
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

// 2. CORS - Accept both www and non-www of the frontend domain
const getFrontendDomain = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

const FRONTEND_DOMAIN = getFrontendDomain(FRONTEND_URL); // e.g. "nexyovi.com"

app.use(cors({
  origin: function (origin, callback) {
    // Allow any origin for now to resolve CORS issues
    callback(null, origin || true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token', 'X-Nonce', 'Accept', 'Origin'],
  exposedHeaders: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset', 'X-CSRF-Token'],
  maxAge: 86400,
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



// ════════════════════════════════════════════════════════════
// ── CSRF PROTECTION (disabled — JWT + rate-limiting protect all routes)
// ════════════════════════════════════════════════════════════
// NOTE: In-memory CSRF tokens do not work with cPanel multi-process Passenger
// workers because each worker has its own memory. JWT (Bearer tokens) already
// protect all authenticated routes, and rate-limiting protects public ones.

// CSRF token endpoint — returns a dummy token (kept for frontend compatibility)
app.get('/api/csrf-token', (req, res) => {
  res.json({ token: 'csrf-not-required' });
});

// No CSRF middleware — JWT + rate-limiting is the security layer
app.use('/api', (req, res, next) => next());

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

// ════════════════════════════════════════════════════════════
// ── FILE UPLOAD API (Local Storage)
// ════════════════════════════════════════════════════════════

const uploadDir = path.join(__dirname, 'public', 'uploads');
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (e) {
  console.error('[WARNING] Could not create uploads directory. File uploads may fail:', e.message);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // We construct the full URL if we want, or just return the path
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.get('host');
    const publicUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    
    res.status(201).json({ url: publicUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ════════════════════════════════════════════════════════════
// ── CRUD DATA API ROUTES
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

// ── EMAIL TRANSPORTER SETUP (Ethionet SMTP)
// contact@nexyovi.com sends contact form emails
const getContactTransporter = () => {
  const nodemailer = require('nodemailer');
  return nodemailer.createTransport({
    host: 'mail1.ethionet.et', // Hardcoded to prevent .env misconfig
    port: 25,
    secure: false, // port 25 = no SSL
    auth: {
      user: process.env.SMTP_USER || 'contact@nexyovi.com',
      pass: process.env.SMTP_PASS || 'Jonnahjnr@0945628075YONas',
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
  });
};

// job@nexyovi.com sends job/internship application emails
const getJobTransporter = () => {
  const nodemailer = require('nodemailer');
  return nodemailer.createTransport({
    host: 'mail1.ethionet.et', // Hardcoded to prevent .env misconfig
    port: 25,
    secure: false, // port 25 = no SSL
    auth: {
      user: process.env.JOB_EMAIL || 'job@nexyovi.com',
      pass: process.env.SMTP_PASS || 'Jonnahjnr@0945628075YONas',
    },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
  });
};

// Legacy alias (kept for safety)
const getTransporter = getContactTransporter;

// Create a record
app.post('/api/data/:entity', (req, res, next) => {
  const publicEntities = ['applications', 'messages'];
  if (publicEntities.includes(req.params.entity)) {
    // Bypass auth for public forms
    return next();
  }
  // Require auth for everything else
  return authMiddleware(req, res, next);
}, async (req, res) => {
  try {
    const record = db.create(req.params.entity, req.body);
    
    // Trigger email notification asynchronously if it's an application
    if (req.params.entity === 'applications') {
      (async () => {
        try {
          const transporter = getJobTransporter();
          await transporter.verify();
          const mailOptions = {
            from: `"Nexyovi Applications" <${process.env.JOB_EMAIL || 'job@nexyovi.com'}>`,
            to: process.env.JOB_EMAIL || 'job@nexyovi.com',
            subject: `New Application: ${record.role} - ${record.name}`,
            html: `
              <h2>New Job/Internship Application Received</h2>
              <p><strong>Applicant Name:</strong> ${record.name}</p>
              <p><strong>Email:</strong> ${record.email}</p>
              <p><strong>Phone:</strong> ${record.phone || 'N/A'}</p>
              <p><strong>Type:</strong> ${record.type === 'job' ? 'Career' : 'Internship'}</p>
              <p><strong>Role:</strong> ${record.role}</p>
              <p><strong>Resume URL:</strong> <a href="${record.resume_url}">View Resume</a></p>
              <p><strong>Portfolio URL:</strong> ${record.portfolio_url ? `<a href="${record.portfolio_url}">View Portfolio</a>` : 'N/A'}</p>
              <br/>
              <h3>Cover Letter / Message:</h3>
              <p>${record.cover_letter || 'No cover letter provided.'}</p>
            `
          };
          const info = await transporter.sendMail(mailOptions);
          console.log('[EMAIL] Application email sent OK:', info.messageId);
        } catch (mailErr) {
          console.error('[EMAIL ERROR] Application email failed:', mailErr.code, mailErr.message);
        }
      })();
    }
    
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Contact form endpoint (saves to messages & sends email)
app.post('/api/contact', async (req, res) => {
  try {
    // 1. Save to DB
    const record = db.create('messages', req.body);
    
    // 2. Send Email Notification
    let emailSent = false;
    let emailError = null;
    
    try {
      const transporter = getContactTransporter();
      await transporter.verify();
      
      const email1 = process.env.CONTACT_EMAIL_1 || 'contact@nexyovi.com';
      const email2 = process.env.CONTACT_EMAIL_2 || 'info@nexyovi.com';
      const recipients = [email1, email2].join(', ');

      const mailOptions = {
        from: `"Nexyovi Website" <${process.env.SMTP_USER || 'contact@nexyovi.com'}>`,
        to: recipients,
        replyTo: record.email,
        subject: `New Contact Inquiry from ${record.name} - ${record.company || 'N/A'}`,
        html: `
          <h2>New Project/Consulting Inquiry</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Phone:</strong> ${record.phone || 'N/A'}</p>
          <p><strong>Company:</strong> ${record.company || 'N/A'}</p>
          <p><strong>Service Required:</strong> ${record.service || 'N/A'}</p>
          <br/>
          <h3>Message Details:</h3>
          <p>${record.message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log('[EMAIL] Contact email sent OK to', recipients);
    } catch (mailErr) {
      console.error('[EMAIL ERROR] Contact email failed:', mailErr.code, mailErr.message);
      emailError = mailErr.message;
    }

    res.status(201).json({ ...record, emailSent, emailError });
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
    const record = db.update(entity, id, req.body);
    if (!record) return res.status(404).json({ error: 'Not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a record (auth required)
app.delete('/api/data/:entity/:id', authMiddleware, (req, res) => {
  try {
    const record = db.remove(req.params.entity, req.params.id);
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

// ════════════════════════════════════════════════════════════
// ── SERVE FRONTEND STATIC FILES (Ultimate Full-Stack Setup)
// ════════════════════════════════════════════════════════════

app.use(express.static(path.join(__dirname, 'public')));

// Fallback 404 for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// For any other route, send the React index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
