const fs = require('fs');
const path = require('path');
const files = ['SecurityService.tsx', 'SoftwareService.tsx', 'NetworkingService.tsx', 'AIService.tsx', 'CloudService.tsx', 'DataService.tsx', 'AppDevService.tsx'];

files.forEach(file => {
  const p = path.join('src/pages', file);
  let content = fs.readFileSync(p, 'utf8');
  
  // Replace the opening div wrapper with a fragment
  content = content.replace(/<div className="bg-\[#02040a\] min-h-screen text-white font-sans[^>]+>/, '<>');
  
  // Replace the last closing div with a fragment closer
  const lastDivIndex = content.lastIndexOf('</div>');
  if (lastDivIndex !== -1) {
    content = content.substring(0, lastDivIndex) + '</>' + content.substring(lastDivIndex + 6);
  }
  
  fs.writeFileSync(p, content);
  console.log('Processed', file);
});
