# 🔑 Nexyovi Secrets Management Guide

## Never Store These in Git

The following secrets must **never** be committed to version control:

### Critical Secrets (immediate rotation if exposed)

```
OPENAI_API_KEY
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
JWT_SECRET
ENCRYPTION_KEY
SENDGRID_API_KEY
CF_API_TOKEN
SENTRY_DSN
```

### Environment Files (.env)

| File | Purpose | Git |
|------|---------|-----|
| `.env` | Local development | ❌ Ignored |
| `.env.local` | Local overrides | ❌ Ignored |
| `.env.production` | Production secrets | ❌ Ignored |
| `.env.example` | Template with placeholder values | ✅ Tracked |

---

## Secrets Storage Solutions

### 1. GitHub Secrets (Recommended for CI/CD)

```yaml
# .github/workflows/deploy.yml
- name: Deploy
  env:
    SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
    FRONTEND_URL: ${{ secrets.FRONTEND_URL }}
```

**Setup:**
1. Go to: Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add each secret individually

### 2. Vercel Environment Variables (for Frontend Deploys)

```bash
# Install Vercel CLI
npm i -g vercel

# Add secrets
vercel secrets add supabase_service_role_key "your-key-here"
vercel secrets add stripe_secret_key "your-key-here"

# Link to environment
vercel env add SUPABASE_URL production
vercel env add VITE_SUPABASE_URL production
```

### 3. AWS Secrets Manager (for Backend)

```javascript
const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager({ region: 'us-east-1' });

async function getSecret(secretName) {
  const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
  return JSON.parse(data.SecretString);
}

// Usage
const secrets = await getSecret('nexyovi/production');
process.env.SUPABASE_URL = secrets.SUPABASE_URL;
```

---

## Backend Validation

The backend already validates required secrets on startup:

```javascript
// backend/index.js
const requiredEnvVars = ['FRONTEND_URL'];
if (NODE_ENV === 'production') {
  const missing = requiredEnvVars.filter(v => !process.env[v]);
  if (missing.length) {
    console.error(`[FATAL] Missing required env vars: ${missing.join(', ')}`);
    process.exit(1);
  }
}
```

### Required Production Variables

| Variable | Source | Example |
|----------|--------|---------|
| `PORT` | .env | `5000` |
| `NODE_ENV` | Platform | `production` |
| `FRONTEND_URL` | .env | `https://nexyovi.com` |
| `SUPABASE_URL` | Supabase | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Supabase | `eyJhbGciOiJIUzI1NiIs...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | `eyJhbGciOiJIUzI1NiIs...` |

---

## Secret Rotation Policy

| Secret | Rotation Frequency | Auto-Rotate |
|--------|-------------------|-------------|
| JWT_SECRET | Every 90 days | Manual |
| SUPABASE keys | Every 180 days | Manual |
| STRIPE keys | Every 365 days | Manual |
| API tokens | Every 90 days | Manual |
| Encryption keys | Every 365 days | Manual |

---

## Incident Response: Secret Leakage

### If a secret is accidentally committed:

1. **Immediately rotate the secret** at the source (Supabase, Stripe, etc.)
2. **Remove the secret from git history:**
   ```bash
   # Remove from all git history
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch .env.production' \
     --prune-empty --tag-name-filter cat -- --all
   
   # Force push (with team coordination)
   git push origin --force --all
   ```
3. **Revoke any exposed tokens** in the provider dashboard
4. **Run a full audit** to check for unauthorized access
5. **Update the security.txt** incident log

### Prevention

- ✅ Pre-commit hooks (husky + lint-staged) can check for secrets
- ✅ GitHub secret scanning alerts on commits
- ✅ Gitleaks in CI/CD pipeline blocks secrets from being merged
- ✅ `.env` files in `.gitignore`
- ✅ `.env.example` template instead of real secrets
