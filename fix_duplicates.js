const fs = require('fs');
const path = require('path');

// Read the translations file
const filePath = path.join(__dirname, 'src', 'utils', 'translations.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Find all the language sections and fix duplicates within each section
const lines = content.split('\n');
let inEnglishSection = false;
let inFrenchSection = false;
let currentSection = [];
let fixedLines = [];
let englishKeys = new Set();
let frenchKeys = new Set();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if we're entering English section
  if (line.includes('export const translations = {')) {
    inEnglishSection = true;
    fixedLines.push(line);
    continue;
  }
  
  // Check if we're entering French section  
  if (line.includes('fr: {')) {
    inEnglishSection = false;
    inFrenchSection = true;
    fixedLines.push(line);
    englishKeys.clear();
    continue;
  }
  
  // Check if we're exiting a section
  if (line.includes('};') && (inEnglishSection || inFrenchSection)) {
    inEnglishSection = false;
    inFrenchSection = false;
    fixedLines.push(line);
    continue;
  }
  
  // Process translation lines
  if ((inEnglishSection || inFrenchSection) && line.includes("':")) {
    const match = line.match(/'([^']+)':/);
    if (match) {
      const key = match[1];
      const currentKeys = inEnglishSection ? englishKeys : frenchKeys;
      
      if (!currentKeys.has(key)) {
        currentKeys.add(key);
        fixedLines.push(line);
      } else {
        console.log(`Removing duplicate key: ${key} in ${inEnglishSection ? 'English' : 'French'} section`);
        // Skip this duplicate line
        continue;
      }
    } else {
      fixedLines.push(line);
    }
  } else {
    fixedLines.push(line);
  }
}

// Write the fixed content back
const fixedContent = fixedLines.join('\n');
fs.writeFileSync(filePath, fixedContent, 'utf8');

console.log('Fixed duplicate translation keys!');
