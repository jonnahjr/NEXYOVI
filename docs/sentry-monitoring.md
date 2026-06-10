# 📊 Nexyovi Monitoring & Observability Guide

## Overview

This document covers the monitoring, logging, and observability stack for Nexyovi production systems.

---

## 1. Sentry Error Tracking

### Backend Integration

```bash
npm install @sentry/node @sentry/profiling-node
```

```javascript
// backend/sentry.js
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  profilesSampleRate: 0.1,
  integrations: [nodeProfilingIntegration()],
  
  // Security: Filter out sensitive data
  beforeSend(event, hint) {
    // Remove sensitive fields
    if (event.request?.data) {
      delete event.request.data.password;
      delete event.request.data.token;
      delete event.request.data.secret;
    }
    return event;
  },
});

// Express error handler integration
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
```

### Frontend Integration

```bash
npm install @sentry/react @sentry/browser @sentry/tracing
```

```typescript
// frontend/src/lib/sentry.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV || 'development',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.1,
  
  // Filter out PII
  beforeSend(event) {
    if (event.user) {
      delete event.user.email;
      delete event.user.username;
    }
    return event;
  },
});

// Error boundary for React
export const SentryErrorBoundary = Sentry.ErrorBoundary;
```

### React Error Boundary Usage

```tsx
import { SentryErrorBoundary } from '../lib/sentry';

function App() {
  return (
    <SentryErrorBoundary
      fallback={({ error, componentStack }) => (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-white/60">Our team has been notified. Please try again.</p>
          </div>
        </div>
      )}
    >
      <YourApp />
    </SentryErrorBoundary>
  );
}
```

---

## 2. Structured Audit Logging (Backend)

The backend already uses structured JSON logging:

```javascript
// backend/index.js - Already implemented
const securityLog = (event, details = {}) => {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  };
  console.log(JSON.stringify({ level: 'SECURITY', ...entry }));
};
```

### Logged Events

| Event | Trigger | Data |
|-------|---------|------|
| `REQUEST` | All HTTP requests | method, path, status, duration, ip, userAgent |
| `CSP_VIOLATION` | CSP rule violation | blockedUri, violatedDirective, sourceFile |
| `WAITLIST_SIGNUP` | New waitlist entry | email (no PII) |
| `VALIDATION_FAILED` | Input validation error | field, reason |
| `SERVER_ERROR` | 500 errors | method, path, error |
| `CSRF_INVALID` | CSRF token validation fail | IP fragment |
| `RATE_LIMIT_EXCEEDED` | Rate limit hit | IP |
| `UNCAUGHT_EXCEPTION` | Unhandled exception | error |
| `UNHANDLED_REJECTION` | Unhandled promise rejection | error |

### Log Aggregation (Recommended)

```yaml
# docker-compose.yml (optional)
services:
  # ELK Stack for log aggregation
  elasticsearch:
    image: elasticsearch:8.x
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"

  logstash:
    image: logstash:8.x
    ports:
      - "5000:5000"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf

  kibana:
    image: kibana:8.x
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
```

### Logstash Configuration

```plaintext
input {
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  json {
    source => "message"
  }
  date {
    match => ["timestamp", "ISO8601"]
  }
}

output {
  elasticsearch {
    hosts => ["localhost:9200"]
    index => "nexyovi-audit-%{+YYYY.MM.dd}"
  }
}
```

---

## 3. OpenTelemetry Integration (Optional)

```bash
npm install @opentelemetry/api @opentelemetry/sdk-node \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-otlp-grpc
```

```javascript
// backend/tracing.js
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-otlp-grpc');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'nexyovi-api',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.error('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
```

---

## 4. Health Check Endpoint

Already implemented at `GET /`:

```json
{
  "status": "ok",
  "message": "Nexyovi API is running",
  "environment": "production",
  "timestamp": "2026-06-10T12:00:00.000Z"
}
```

### Monitoring Check

```bash
# Add to your monitoring system
curl -f http://nexyovi.com:5000/ || alert
```

---

## 5. Alerting Rules

### Critical Alerts (Immediate Response)

| Rule | Check | Action |
|------|-------|--------|
| 5xx Rate > 5% | Health check status | PagerDuty + Slack |
| No healthy instances | Load balancer | PagerDuty |
| SSL certificate expiring < 30 days | Certificate monitor | Email + Slack |
| Dependency CVE (Critical) | npm audit | Slack + GitHub issue |

### Warning Alerts (Business Hours)

| Rule | Check | Action |
|------|-------|--------|
| 4xx Rate > 10% | WAF logs | Slack |
| P99 Latency > 2s | APM | Slack |
| Rate limit hits > 50/min | API logs | Slack |
| CSP violations > 10/min | CSP report endpoint | Slack |

---

## Quick Start

### 1. Sentry Setup
```bash
# Get your DSN from https://sentry.io
# Add to .env:
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_DSN=https://xxx@sentry.io/xxx
```

### 2. Verify Logging
```bash
# Tail backend logs
npm run dev | grep "SECURITY"

# You should see structured JSON logs like:
# {"level":"SECURITY","timestamp":"...","event":"REQUEST","method":"GET","path":"/","status":200}
```
