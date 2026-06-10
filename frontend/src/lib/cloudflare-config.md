# ☁️ Cloudflare Enterprise Security Configuration

## Overview

This guide configures Cloudflare for the Nexyovi platform with enterprise-grade protection: WAF, bot management, DDoS mitigation, rate limiting at edge, zero trust access, and country-based restrictions.

---

## 1. DNS Configuration

### Required Records

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` | `<server-ip>` | ✅ Proxied (orange cloud) |
| A | `www` | `<server-ip>` | ✅ Proxied |
| A | `api` | `<server-ip>` | ✅ Proxied |
| CNAME | `*` | `@` | ✅ Proxied |

**Critical:** All records MUST be proxied (orange cloud) for Cloudflare security features to apply.

---

## 2. SSL/TLS Configuration

```
SSL/TLS Settings:
┌──────────────────────────────────────────────┐
│ SSL/TLS Encryption Mode:   FULL (strict)     │
│ Minimum TLS Version:       1.3               │
│ Opportunistic Encryption:  ON                │
│ TLS 1.3:                   ON                │
│ Automatic HTTPS Rewrites:  ON                │
│ Certificate Transparency:  ON                │
│ Universal SSL:             ON                │
└──────────────────────────────────────────────┘
```

### Edge Certificates
- [x] Always Use HTTPS
- [x] HTTP Strict Transport Security (HSTS): `max-age=31536000; includeSubDomains; preload`
- [x] Minimum TLS Version: 1.3
- [x] TLS 1.3: Enabled

---

## 3. WAF (Web Application Firewall) Rules

### 3.1 OWASP Core Ruleset

Enable **Cloudflare WAF Managed Ruleset** with:
```
Ruleset: Cloudflare OWASP Core Ruleset v4.x
Paranoia Level: 2 (Balanced)
Sensitivity: Medium
Action: Block
```

### 3.2 Custom WAF Rules

```nginx
# ── Block SQL Injection ──────────────────────────────
(http.request.uri.path contains "select") or
(http.request.uri.path contains "union") or
(http.request.uri.path contains "drop table") or
(http.request.body contains "select") and
(not cf.client.bot)
→ BLOCK

# ── Block Path Traversal ─────────────────────────────
(http.request.uri.path contains "..") or
(http.request.uri.path contains "etc/passwd") or
(http.request.uri.path contains "wp-config")
→ BLOCK

# ── Block XSS Attempts ───────────────────────────────
(http.request.uri.query contains "<script") or
(http.request.body contains "onerror=") or
(http.request.body contains "javascript:")
→ BLOCK

# ── Rate Limit API Endpoints ─────────────────────────
http.request.uri.path contains "/api/"
→ RATE LIMIT: 100 requests per 10 seconds per IP
→ ACTION: Block for 60 seconds

# ── Block Malicious File Extensions ──────────────────
(http.request.uri.path matches "\.(php|asp|aspx|jsp|cgi|pl|py|sh|bash)$")
and not http.host eq "admin.nexyovi.com"
→ BLOCK
```

### 3.3 Rate Limiting Rules

| Rule | Path | Threshold | Action |
|------|------|-----------|--------|
| API Global | `/api/*` | 100 req/10s | Block 60s |
| Auth | `/api/auth/*` | 10 req/60s | Block 30min |
| Contact | `/api/waitlist` | 5 req/60s | Block 60min |
| Static | `/*.html` | 1000 req/60s | Block 30s |

---

## 4. Bot Management

### Configuration

```
Bot Management:
┌──────────────────────────────────────────────┐
│ Bot Mode:          Enterprise Bot Management │
│ Bot Score:         Block < 30                │
│ Definite Bots:     Block all                 │
│ Verified Bots:     Allow (Google, Bing, etc) │
│ Headless Browsers: Challenge                 │
│ API Endpoints:     Block all bots            │
│ Public Forms:      Turnstile CAPTCHA         │
└──────────────────────────────────────────────┘
```

### Bot Fight Mode Rules

```javascript
// Block high-confidence bots on ALL endpoints
(cf.bot_management.score lt 30)
→ BLOCK

// Challenge headless browsers on sensitive paths
(cf.bot_management.detected_operation eq "headless") and
(http.request.uri.path contains "/contact")
→ CHALLENGE (JS challenge)

// Allow verified search engine crawlers
(cf.bot_management.verified_bot eq true)
→ ALLOW
```

---

## 5. DDoS Protection

```
DDoS Settings:
┌──────────────────────────────────────────────┐
│ DDoS Protection Level:  HIGH                │
│ HTTP DDoS:              ON (default)         │
│ L3/4 DDoS:             ON (default)         │
│ Advanced DDoS:         ON                   │
│ Mitigation Mode:       AUTO                 │
│ Sensitive Endpoints:   RATE-LIMIT + CHALLENGE│
└──────────────────────────────────────────────┘
```

### Sensitive Endpoint Protection

```nginx
# Protect authentication endpoints
(http.request.uri.path contains "/admin/login") or
(http.request.uri.path contains "/api/auth")
→ RATE LIMIT
→ CHALLENGE on suspicious patterns

# Protect form submissions
http.request.uri.path contains "/api/waitlist"
→ RATE LIMIT: 5 req/min per IP
→ CHALLENGE on repeated violations
```

---

## 6. Zero Trust Access (Cloudflare Access)

### Protected Applications

| Application | Policy | Auth Method |
|-------------|--------|-------------|
| Admin Panel (`/admin/*`) | Only authorized emails | Google OAuth + Email OTP |
| API (`/api/admin/*`) | Service tokens | Cloudflare Access JWT |

### Access Policy Template

```json
{
  "name": "Admin Panel Access",
  "decision": "allow",
  "include": [
    {
      "email_domain": {
        "domain": "nexyovi.com"
      }
    },
    {
      "email": ["admin@nexyovi.com"]
    }
  ],
  "require": {
    "auth_method": "google"
  }
}
```

---

## 7. Country-Based Restrictions

### Blocked Countries (if applicable)

```nginx
# Block traffic from high-risk countries
(ip.geoip.country in {"RU" "CN" "KP" "IR" "SY" "CU" "VE" "AF" "IQ" "LY" "SO" "SD" "YE" "BY" "MM" "ER" "ML" "NI" "SS" "ZW"})
→ BLOCK
```

### Geo-Restricted Content (if applicable)

```nginx
# Allow only specific regions for sensitive resources
(http.request.uri.path contains "/admin") and
(ip.geoip.country not in {"ET" "US" "GB" "DE" "FR" "NL" "SG" "AE" "KE" "ZA" "NG" "RW" "GH" "TZ" "UG"})
→ BLOCK
```

---

## 8. Page Rules

| Rule | URL Pattern | Setting |
|------|-------------|---------|
| HTTPS Redirect | `*.nexyovi.com/*` | Always Use HTTPS |
| Cache Static | `*.nexyovi.com/assets/*` | Cache Level: Standard, Edge Cache TTL: 1d |
| Cache HTML | `*.nexyovi.com/` | Cache Level: Standard, Edge Cache TTL: 0 (no cache for HTML) |
| Security Level | `*nexyovi.com/admin/*` | Security Level: Under Attack |
| Disable Cache | `*nexyovi.com/api/*` | Cache Level: Bypass |
| Transform Rules | `*nexyovi.com/*` | Remove Server header, Add security headers |

---

## 9. Security Headers via Transform Rules

Set these response headers at the Cloudflare edge:

```nginx
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{random}'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'; upgrade-insecure-requests
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
Cross-Origin-Opener-Policy: same-origin-allow-popups
Cross-Origin-Resource-Policy: cross-origin
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

---

## 10. Cache Configuration

```
Cache Rules:
┌──────────────────────────────────────────────┐
│ Static Assets:     Cache for 1 year          │
│ (images, js, css, fonts)                    │
│                                              │
│ HTML Pages:        No cache (dynamic)        │
│                                              │
│ API Responses:     No cache                  │
│                                              │
│ Admin Pages:       No cache, no store        │
│                                              │
│ Edge Cache TTL:    0 for HTML, 1d for assets │
└──────────────────────────────────────────────┘
```

---

## 11. Network Settings

```nginx
# HTTP/2 and HTTP/3
HTTP/2:      ON
HTTP/3:      ON (with QUIC)
gRPC:        ON
WebSockets:  ON (for Supabase realtime)

# IP Geolocation
IP Geolocation: ON (adds CF-IPCountry header)

# Proxy
gRPC:            ON
WebSockets:      ON
0-RTT:           OFF (security risk)
```

---

## 12. Monitoring & Alerts

### Recommended Alert Rules

| Alert | Threshold | Notification |
|-------|-----------|--------------|
| WAF Blocked Requests | > 100/min | Email + Slack |
| Rate Limit Hits | > 50/min | Email + Slack |
| DDoS Attack | Active | PagerDuty + Slack |
| 5xx Spike | > 5% of traffic | Email + Slack |
| High Bot Score | > 1000/min | Email |

---

## 13. Backend Configuration

The backend already handles Cloudflare headers:

```javascript
// In backend/index.js - Already implemented:
keyGenerator: (req) => {
  return req.get('CF-Connecting-IP') ||    // Cloudflare IP
         req.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
         req.ip ||
         'unknown';
}
```

**Required environment variables:**
```
CF_API_TOKEN=<your-cloudflare-api-token>
CF_ZONE_ID=<your-zone-id>
CF_ACCOUNT_ID=<your-account-id>
```

---

## 14. Turnstile (CAPTCHA Alternative)

```html
<!-- Contact form integration -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<div class="cf-turnstile" data-sitekey="<YOUR_SITE_KEY>"></div>
```

---

## Quick Deploy Checklist

- [ ] Domain proxied through Cloudflare (orange cloud)
- [ ] SSL/TLS set to Full (strict)
- [ ] Minimum TLS Version 1.3
- [ ] Always Use HTTPS ON
- [ ] HSTS enabled
- [ ] WAF OWASP Core Ruleset enabled (Paranoia Level 2)
- [ ] Custom WAF rules created (SQLi, XSS, path traversal)
- [ ] Bot Management configured
- [ ] DDoS protection active
- [ ] Rate limiting rules created
- [ ] Country restrictions applied (if needed)
- [ ] Page rules configured
- [ ] Transform rules for security headers
- [ ] Monitoring alerts configured
- [ ] All DNS records proxied
- [ ] Backend CF-Connecting-IP header handling verified
