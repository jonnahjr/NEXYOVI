const nodemailer = require('nodemailer');

const cfg = { host: 'mail1.ethionet.et', port: 25, secure: false, label: 'mail1.ethionet.et:25 plain' };
const USER = 'contact@nexyovi.com';
const PASS = 'Jonnahjnr@0945628075YONas';

(async () => {
    console.log(`\n───────────────────────────────────────`);
    console.log(`Testing: ${cfg.label}`);
    try {
      const transporter = nodemailer.createTransport({
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,
        auth: { user: USER, pass: PASS },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      console.log('  Verifying SMTP connection...');
      await transporter.verify();
      console.log('  ✅ Connection OK! Sending test email...');

      const info = await transporter.sendMail({
        from: `"Nexyovi Test" <${USER}>`,
        to: USER,
        subject: `SMTP Test - ${cfg.label} - ${new Date().toISOString()}`,
        text: `This is a test email sent via ${cfg.label}.`,
      });

      console.log(`  ✅ EMAIL SENT! MessageId: ${info.messageId}`);
    } catch (err) {
      console.error(`  ❌ FAILED: [${err.code}] ${err.message}`);
    }
  console.log('\n───────────────────────────────────────');
})();
