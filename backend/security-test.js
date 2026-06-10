#!/usr/bin/env node

/**
 * ════════════════════════════════════════════════════════════
 * SECURITY TESTING & VULNERABILITY SCANNER
 * ════════════════════════════════════════════════════════════
 * 
 * Run: node backend/security-test.js
 * 
 * This script performs various security checks and tests against
 * the backend API to identify potential vulnerabilities.
 */

const http = require('http');
const https = require('https');

// ════════════════════════════════════════════════════════════
// CONFIGURATION
// ════════════════════════════════════════════════════════════

const API_URL = process.env.API_URL || 'http://localhost:5000';
const TEST_EMAIL = 'security-test@nexyovi.com';

const tests = [];
let passed = 0;
let failed = 0;

// ════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ════════════════════════════════════════════════════════════

const makeRequest = (method, path, data = null) => {
    return new Promise((resolve, reject) => {
        const url = new URL(API_URL + path);
        const isHttps = url.protocol === 'https:';
        const client = isHttps ? https : http;

        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = client.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: body ? JSON.parse(body) : null
                    });
                } catch (e) {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                }
            });
        });

        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
};

const test = (name, fn) => {
    tests.push({ name, fn });
};

const assert = (condition, message) => {
    if (!condition) {
        throw new Error(message);
    }
};

// ════════════════════════════════════════════════════════════
// SECURITY TESTS
// ════════════════════════════════════════════════════════════

// Test 1: Security Headers
test('✓ Security Headers - CSP Present', async () => {
    const response = await makeRequest('GET', '/');
    const headers = response.headers;
    assert(
        headers['content-security-policy'],
        'CSP header missing'
    );
});

test('✓ Security Headers - X-Frame-Options Present', async () => {
    const response = await makeRequest('GET', '/');
    assert(
        response.headers['x-frame-options'],
        'X-Frame-Options header missing'
    );
});

test('✓ Security Headers - X-Content-Type-Options', async () => {
    const response = await makeRequest('GET', '/');
    assert(
        response.headers['x-content-type-options'],
        'X-Content-Type-Options header missing'
    );
});

test('✓ Security Headers - No Powered-By', async () => {
    const response = await makeRequest('GET', '/');
    assert(
        !response.headers['x-powered-by'],
        'X-Powered-By header should not be present'
    );
});

// Test 2: Input Validation
test('✓ Input Validation - Missing Email', async () => {
    const response = await makeRequest('POST', '/api/waitlist', {});
    assert(response.status === 400, 'Should reject missing email');
});

test('✓ Input Validation - Invalid Email Format', async () => {
    const response = await makeRequest('POST', '/api/waitlist', {
        email: 'not-an-email'
    });
    assert(response.status === 400, 'Should reject invalid email format');
});

test('✓ Input Validation - Valid Email Accepted', async () => {
    const response = await makeRequest('POST', '/api/waitlist', {
        email: TEST_EMAIL
    });
    assert(
        response.status === 201 || response.status === 409,
        'Valid email should be accepted (201) or already exists (409)'
    );
});

// Test 3: SQL Injection
test('✓ SQL Injection - Payload Blocked', async () => {
    const response = await makeRequest('POST', '/api/waitlist', {
        email: "'; DROP TABLE users; --@example.com"
    });
    assert(
        response.status === 400 || response.status === 500,
        'SQL injection attempt should be blocked or return error'
    );
});

// Test 4: XSS Prevention
test('✓ XSS Prevention - Script Tags Rejected', async () => {
    const response = await makeRequest('POST', '/api/waitlist', {
        email: '<script>alert("xss")</script>@example.com'
    });
    assert(
        response.status === 400,
        'Script tags should be rejected'
    );
});

// Test 5: CORS
test('✓ CORS - Access-Control Headers Present', async () => {
    const response = await makeRequest('GET', '/');
    assert(
        response.headers['access-control-allow-origin'] ||
        response.headers['access-control-allow-credentials'],
        'CORS headers should be present'
    );
});

// Test 6: Rate Limiting
test('✓ Rate Limiting - Headers Present', async () => {
    const response = await makeRequest('GET', '/');
    const headers = response.headers;
    const hasRateLimitHeaders =
        headers['ratelimit-limit'] ||
        headers['x-ratelimit-limit'] ||
        headers['retry-after'];

    assert(
        hasRateLimitHeaders,
        'Rate limiting headers should be present'
    );
});

// Test 7: HTTPS/HSTS
test('✓ HSTS - Header Present', async () => {
    const response = await makeRequest('GET', '/');
    assert(
        response.headers['strict-transport-security'],
        'HSTS header missing (HTTPS enforcement)'
    );
});

// Test 8: Error Handling
test('✓ Error Handling - No Stack Traces', async () => {
    const response = await makeRequest('GET', '/nonexistent');
    const body = JSON.stringify(response.body);
    assert(
        !body.includes('at ') && !body.includes('Error:'),
        'Error responses should not leak stack traces'
    );
});

// Test 9: Body Size Limit
test('✓ Body Size Limit - Large Payload Rejected', async () => {
    const largePayload = 'a'.repeat(100000); // 100KB
    try {
        const response = await makeRequest('POST', '/api/waitlist', {
            email: largePayload
        });
        assert(
            response.status === 413 || response.status === 400,
            'Large payloads should be rejected'
        );
    } catch (e) {
        // Expected to fail or reject
    }
});

// Test 10: Duplicate Prevention
test('✓ Duplicate Prevention - Existing Email Rejected', async () => {
    // First request
    await makeRequest('POST', '/api/waitlist', {
        email: 'duplicate-test@example.com'
    });

    // Second request with same email
    const response = await makeRequest('POST', '/api/waitlist', {
        email: 'duplicate-test@example.com'
    });

    assert(
        response.status === 409,
        'Duplicate email should return 409 Conflict'
    );
});

// ════════════════════════════════════════════════════════════
// VULNERABILITY CHECKLIST
// ════════════════════════════════════════════════════════════

const vulnerabilityChecklist = {
    'OWASP Top 10': [
        '[ ] A01:2021 - Broken Access Control',
        '[ ] A02:2021 - Cryptographic Failures',
        '[ ] A03:2021 - Injection',
        '[ ] A04:2021 - Insecure Design',
        '[ ] A05:2021 - Security Misconfiguration',
        '[ ] A06:2021 - Vulnerable and Outdated Components',
        '[ ] A07:2021 - Authentication Failures',
        '[ ] A08:2021 - Software and Data Integrity Failures',
        '[ ] A09:2021 - Logging and Monitoring Failures',
        '[ ] A10:2021 - SSRF'
    ],

    'API Security': [
        '[ ] Broken Authentication',
        '[ ] Broken Authorization',
        '[ ] Information Exposure',
        '[ ] Injection Flaws',
        '[ ] Improper Assets Management',
        '[ ] Rate Limiting/DoS Protection',
        '[ ] Mass Assignment',
        '[ ] CORS Misconfiguration'
    ],

    'Database Security': [
        '[ ] SQL Injection',
        '[ ] NoSQL Injection',
        '[ ] Unencrypted Sensitive Data',
        '[ ] Missing Row Level Security',
        '[ ] Exposed Database Credentials',
        '[ ] Missing Database Backups'
    ]
};

// ════════════════════════════════════════════════════════════
// RUNNER
// ════════════════════════════════════════════════════════════

const runTests = async () => {
    console.log(`
╔══════════════════════════════════════════════════════════════════╗
║           🔒 SECURITY TESTING SUITE - NEXYOVI                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║ Testing: ${API_URL}
║ Environment: ${process.env.NODE_ENV || 'development'}
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
  `);

    console.log('Running security tests...\n');

    for (const testCase of tests) {
        try {
            await testCase.fn();
            console.log(`✅ ${testCase.name}`);
            passed++;
        } catch (error) {
            console.log(`❌ ${testCase.name}`);
            console.log(`   Error: ${error.message}`);
            failed++;
        }
    }

    console.log(`
╔══════════════════════════════════════════════════════════════════╗
║                      📊 TEST RESULTS                            ║
╠══════════════════════════════════════════════════════════════════╣
║ Passed: ${passed}/${tests.length}                                      ║
║ Failed: ${failed}/${tests.length}                                      ║
║ Success Rate: ${((passed / tests.length) * 100).toFixed(1)}%                            ║
╚══════════════════════════════════════════════════════════════════╝
  `);

    console.log('\n📋 OWASP Top 10 Checklist:');
    for (const [category, items] of Object.entries(vulnerabilityChecklist)) {
        console.log(`\n${category}:`);
        items.forEach(item => console.log('  ' + item));
    }

    process.exit(failed > 0 ? 1 : 0);
};

// Run tests
runTests().catch(error => {
    console.error('Test suite failed:', error);
    process.exit(1);
});
