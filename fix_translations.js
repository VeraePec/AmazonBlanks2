const fs = require('fs');
const path = 'src/utils/translations.ts';
let content = fs.readFileSync(path, 'utf8');

// Find and remove duplicates
const lines = content.split('\n');
const seen = new Set();
const cleanLines = [];
let inObject = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detect if we're in the translations object
  if (line.includes('export const translations =')) {
    inObject = true;
  }
  
  if (inObject && line.includes("'") && line.includes(':')) {
    const match = line.match(/'([^']+)':/);
    if (match) {
      const key = match[1];
      if (seen.has(key)) {
        console.log('Removing duplicate key:', key);
        continue; // Skip this line
      }
      seen.add(key);
    }
  }
  
  cleanLines.push(line);
}

fs.writeFileSync(path, cleanLines.join('\n'));
console.log('Removed duplicate translation keys');
