const fs = require('fs');
const html = fs.readFileSync('huly_index.html', 'utf8');
const match = html.match(/<section class="hero[^>]*>([\s\S]*?)<\/section>/is);
if (match) {
  let jsx = match[0]
  .replace(/class=/g, 'className=')
  .replace(/stroke-width=/g, 'strokeWidth=')
  .replace(/stroke-linecap=/g, 'strokeLinecap=')
  .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
  .replace(/fill-rule=/g, 'fillRule=')
  .replace(/clip-rule=/g, 'clipRule=')
  .replace(/style="([^"]+)"/g, (m, p1) => {
    const parts = p1.split(';').filter(Boolean);
    const obj = {};
    parts.forEach(p => {
      const idx = p.indexOf(':');
      if (idx > -1) {
        const k = p.substring(0, idx).trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        const v = p.substring(idx+1).trim();
        obj[k] = v;
      }
    });
    return `style={{${Object.keys(obj).map(k => `'${k}': '${obj[k]}'`).join(', ')}}}`;
  })
  .replace(/<img(.*?)>/g, (m, p1) => {
    if(p1.endsWith('/')) return `<img${p1}>`;
    return `<img${p1} />`;
  })
  .replace(/<source(.*?)>/g, (m, p1) => {
    if(p1.endsWith('/')) return `<source${p1}>`;
    return `<source${p1} />`;
  });
  fs.writeFileSync('HeroDOM.jsx', jsx);
  console.log('DOM Extracted');
} else {
  console.log('No hero section found.');
}
