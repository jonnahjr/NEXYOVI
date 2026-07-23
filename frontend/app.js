const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const reqUrl = req.url.split('?')[0];
  let filePath = path.join(__dirname, reqUrl);

  if (reqUrl === '/' || !path.extname(reqUrl)) {
    filePath = path.join(__dirname, 'index.html');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Fallback to index.html for SPA
      fs.readFile(path.join(__dirname, 'index.html'), (err2, html) => {
        if (err2) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<h1>Site Starting Up...</h1><p>Cannot find index.html in ' + __dirname + '</p>');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(html);
        }
      });
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const MIME = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml'
      };
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
