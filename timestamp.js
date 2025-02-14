import fs from 'fs';

const filePath = 'src/lib/timestamp.js';
const now = new Date();
const content = `Last updated: ${now.toLocaleString('en-US', { timeZone: 'America/New_York' })} at ${now.toLocaleString('en-US', { timeZone: 'America/New_York' })}`;

fs.writeFileSync(filePath, `export const timestamp = "${content}";`);

console.log(`Timestamp file created at: ${filePath}`);
console.log(content);
