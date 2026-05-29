const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'ecommerce/frontend/src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      const ext = path.extname(fullPath);
      if (['.tsx', '.ts', '.js', '.json', '.html'].includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

if (!fs.existsSync(srcDir)) {
  console.error(`Source directory not found: ${srcDir}`);
  process.exit(1);
}

const files = walk(srcDir);
let replacedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.toLowerCase().includes('amazon')) {
    console.log(`Clearing Amazon terms in: ${path.relative(__dirname, file)}`);
    content = content
      .replace(/Amazon Seller Central/g, 'Neximarket Console')
      .replace(/Amazon Seller/g, 'Neximarket Seller')
      .replace(/Amazon Style/g, 'Neximarket Style')
      .replace(/Amazon-Style/g, 'Neximarket-Style')
      .replace(/Amazon-style/g, 'Neximarket-style')
      .replace(/Amazon/g, 'Nexi')
      .replace(/amazon/g, 'nexi');
    fs.writeFileSync(file, content, 'utf8');
    replacedCount++;
  }
});

console.log(`\nSuccess! Fully cleaned ${replacedCount} frontend files from all Amazon branding parameters.`);
