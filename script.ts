import fs from 'fs';

let content = fs.readFileSync('src/components/TuviChart.tsx', 'utf8');
content = content.replace(/text-\[11px\]/g, 'text-size-11');
content = content.replace(/text-\[10px\]/g, 'text-size-10');
content = content.replace(/text-\[9px\]/g, 'text-size-9');
content = content.replace(/text-\[8px\]/g, 'text-size-8');
content = content.replace(/aspect-square/g, 'aspect-square landscape:max-lg:aspect-[4/3]');

fs.writeFileSync('src/components/TuviChart.tsx', content);
console.log('Replaced successfully');
