/**
 * ════════════════════════════════════════════════════════════
 * ADVANCED SECURITY CONFIGURATION (Optional Enhancements)
 * ════════════════════════════════════════════════════════════
 * 
 * This file shows how to implement additional security features
 * for enterprise environments and advanced threat protection.
 */

// ════════════════════════════════════════════════════════════
// 1. JWT AUTHENTICATION (for admin routes)
// ════════════════════════════════════════════════════════════

const jwtExample = `
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// Generate token on login
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Protected route example
app.get('/api/admin/users', verifyToken, (req, res) => {
  // Only authenticated users can access
  res.json({ users: [...] });
});
`;

// ════════════════════════════════════════════════════════════
// 2. PASSWORD HASHING (for admin accounts)
// ════════════════════════════════════════════════════════════

const bcryptExample = `
const bcrypt = require('bcrypt');

// Hash password on registration/update
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password on login
const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Find admin user
  const admin = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
  
  if (!admin || !(await verifyPassword(password, admin.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = generateToken(admin.id);
  res.json({ token });
});
`;

// ════════════════════════════════════════════════════════════
// 3. TWO-FACTOR AUTHENTICATION (2FA)
// ════════════════════════════════════════════════════════════

const twoFactorExample = `
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate 2FA secret
const generate2FASecret = (email) => {
  return speakeasy.generateSecret({
    name: 'Nexyovi (' + email + ')',
    length: 32
  });
};

// Verify 2FA token
const verify2FAToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: token
  });
};

// Setup 2FA endpoint
app.post('/api/admin/2fa/setup', verifyToken, async (req, res) => {
  const secret = generate2FASecret(req.email);
  const qrCode = await QRCode.toDataURL(secret.otpauth_url);
  
  res.json({ 
    secret: secret.base32,
    qrCode: qrCode 
  });
});

// Verify 2FA token
app.post('/api/admin/2fa/verify', (req, res) => {
  const { secret, token } = req.body;
  
  if (verify2FAToken(secret, token)) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid 2FA token' });
  }
});
`;

// ════════════════════════════════════════════════════════════
// 4. DATABASE ENCRYPTION (field-level)
// ════════════════════════════════════════════════════════════

const encryptionExample = `
const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// Encrypt sensitive data
const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
};

// Decrypt sensitive data
const decrypt = (text) => {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  
  let decrypted = decipher.update(parts[1], 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};

// Store encrypted data
const sensitiveData = encrypt('user@example.com');
// Later: decrypt(sensitiveData)
`;

// ════════════════════════════════════════════════════════════
// 5. REQUEST SIGNING (API security)
// ════════════════════════════════════════════════════════════

const requestSigningExample = `
const crypto = require('crypto');

// Generate request signature
const generateSignature = (method, path, timestamp, body, secret) => {
  const message = method + path + timestamp + JSON.stringify(body);
  return crypto.createHmac('sha256', secret).update(message).digest('hex');
};

// Verify request signature
const verifySignature = (req, res, next) => {
  const signature = req.headers['x-signature'];
  const timestamp = req.headers['x-timestamp'];
  
  // Check if timestamp is within 5 minutes (prevent replay attacks)
  if (Math.abs(Date.now() - parseInt(timestamp)) > 5 * 60 * 1000) {
    return res.status(401).json({ error: 'Request expired' });
  }
  
  const expectedSignature = generateSignature(
    req.method,
    req.path,
    timestamp,
    req.body,
    process.env.API_SECRET
  );
  
  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  next();
};

app.post('/api/secure-action', verifySignature, (req, res) => {
  // Process authenticated request
});
`;

// ════════════════════════════════════════════════════════════
// 6. SECURITY AUDIT LOGGING
// ════════════════════════════════════════════════════════════

const auditLoggingExample = `
// Log all security-related events
const auditLog = (eventType, details, ip, userId = null) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    eventType,
    details,
    ip,
    userId,
    userAgent: req?.get('user-agent')
  };
  
  console.log('[AUDIT]', JSON.stringify(logEntry));
  
  // Optionally store in database or logging service
  // await db.query('INSERT INTO audit_logs VALUES (...)', [logEntry]);
};

// Usage examples
auditLog('LOGIN_SUCCESS', { email: 'admin@example.com' }, req.ip, adminId);
auditLog('FAILED_LOGIN_ATTEMPT', { email: 'admin@example.com' }, req.ip);
auditLog('DATA_EXPORT', { table: 'users', rows: 1000 }, req.ip, adminId);
auditLog('ADMIN_USER_CREATED', { newUserId: 123 }, req.ip, adminId);
`;

// ════════════════════════════════════════════════════════════
// 7. SECURITY HEADERS REFERENCE
// ════════════════════════════════════════════════════════════

const securityHeadersReference = `
// Content Security Policy
// Prevents inline scripts and restricts resource loading
Content-Security-Policy: default-src 'self'; script-src 'self'

// HSTS (HTTP Strict Transport Security)
// Forces HTTPS for future requests
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload

// X-Content-Type-Options
// Prevents MIME type sniffing
X-Content-Type-Options: nosniff

// X-Frame-Options
// Prevents clickjacking attacks
X-Frame-Options: DENY

// X-XSS-Protection
// Enables XSS protection
X-XSS-Protection: 1; mode=block

// Referrer-Policy
// Controls how much referrer information is shared
Referrer-Policy: strict-origin-when-cross-origin

// Permissions-Policy (formerly Feature-Policy)
// Controls which browser features can be used
Permissions-Policy: geolocation=(), camera=(), microphone=()

// SameSite Cookie Attribute
// Prevents CSRF attacks
Set-Cookie: sessionId=abc123; SameSite=Strict; Secure; HttpOnly
`;

// ════════════════════════════════════════════════════════════
// IMPLEMENTATION ROADMAP
// ════════════════════════════════════════════════════════════

const implementationRoadmap = {
  immediate: {
    '✅ Done': [
      'Helmet security headers',
      'CORS restrictions',
      'Rate limiting',
      'Input validation'
    ]
  },
  
  phase1: {
    'Timeline: 1-2 weeks': [
      'JWT authentication',
      'Password hashing (bcrypt)',
      'Admin authentication endpoints',
      'Database RLS policies'
    ],
    'Priority': 'HIGH'
  },
  
  phase2: {
    'Timeline: 2-4 weeks': [
      'Two-factor authentication (2FA)',
      'API request signing',
      'Audit logging system',
      'Security monitoring'
    ],
    'Priority': 'HIGH'
  },
  
  phase3: {
    'Timeline: 1 month': [
      'Field-level encryption',
      'Key rotation system',
      'Compliance frameworks (GDPR, SOC2)',
      'Penetration testing'
    ],
    'Priority': 'MEDIUM'
  }
};

// ════════════════════════════════════════════════════════════
// INSTALL ADDITIONAL PACKAGES
// ════════════════════════════════════════════════════════════

const packageInstallation = \`
For Phase 1:
npm install jsonwebtoken bcrypt

For Phase 2:
npm install speakeasy qrcode

For Phase 3:
npm install node-cache pino winston

For Monitoring:
npm install pm2 sentry winston datadog
\`;

// ════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════

module.exports = {
  jwtExample,
  bcryptExample,
  twoFactorExample,
  encryptionExample,
  requestSigningExample,
  auditLoggingExample,
  securityHeadersReference,
  implementationRoadmap,
  packageInstallation
};
