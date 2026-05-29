const fs = require('fs');
fetch('https://huly.io/')
  .then(r => r.text())
  .then(t => {
    const match = t.match(/<video[\s\S]*?<\/video>/gi);
    if(match) {
        console.log(match.join('\n\n'));
    } else {
        console.log('No video found');
    }
  });
