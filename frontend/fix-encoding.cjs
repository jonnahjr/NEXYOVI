const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('src', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        content = content.replace(/â€”/g, '—');
        content = content.replace(/â€“/g, '–');
        content = content.replace(/â€™/g, "'");
        content = content.replace(/Â°/g, '°');
        content = content.replace(/â”€/g, '─');
        content = content.replace(/â†’/g, '→');
        content = content.replace(/â–¼/g, '▼');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed ' + filePath);
        }
    }
});
