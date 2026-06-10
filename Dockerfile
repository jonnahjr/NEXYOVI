# ════════════════════════════════════════════════════════════
# Nexyovi Backend - Production Dockerfile
# Security-hardened multi-stage build
# ════════════════════════════════════════════════════════════

# ── Stage 1: Dependencies ──────────────────────────────────
FROM node:20-alpine AS deps

# Security: Use non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy dependency files
COPY backend/package.json backend/package-lock.json ./

# Install production dependencies only
RUN npm ci --only=production && \
    npm cache clean --force

# ── Stage 2: Production Image ─────────────────────────────
FROM node:20-alpine AS production

# Security: Install minimal packages
RUN apk add --no-cache tini

# Security: Use non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy dependencies from build stage
COPY --from=deps /app/node_modules ./node_modules
COPY backend/ .

# Security: Remove unnecessary files
RUN rm -rf tests *.md .gitignore

# Security: Set proper permissions
RUN chown -R nodejs:nodejs /app

# Security: Run as non-root user
USER nodejs

# Security: Use tini as init to handle signals properly
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "index.js"]

# Security: Expose only the application port
EXPOSE 5000

# Security: Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

# Labels for container scanning
LABEL org.opencontainers.image.source="https://github.com/nexyovi/nexyovi"
LABEL org.opencontainers.image.description="Nexyovi Backend API"
LABEL org.opencontainers.image.licenses="UNLICENSED"
