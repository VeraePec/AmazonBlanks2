const fs = require('fs');
const path = require('path');

// Read the translations file
const filePath = path.join(__dirname, 'src/utils/translations.ts');
const content = fs.readFileSync(filePath, 'utf8');

console.log('Starting comprehensive cleanup of translations file...');

// Split into lines for processing
const lines = content.split('\n');
const cleanedLines = [];
const seenKeys = new Set();
let currentLanguage = null;
let inLanguageSection = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmedLine = line.trim();
  
  // Detect language sections
  if (trimmedLine.includes('gb: {') && trimmedLine.includes('// English')) {
    currentLanguage = 'gb';
    inLanguageSection = true;
    seenKeys.clear();
    cleanedLines.push(line);
    continue;
  } else if (trimmedLine.includes('da: {') && trimmedLine.includes('// Danish')) {
    currentLanguage = 'da';
    inLanguageSection = true;
    seenKeys.clear();
    cleanedLines.push(line);
    continue;
  } else if (trimmedLine.includes('no: {') && trimmedLine.includes('// Norwegian')) {
    currentLanguage = 'no';
    inLanguageSection = true;
    seenKeys.clear();
    cleanedLines.push(line);
    continue;
  } else if (trimmedLine.includes('es: {') && trimmedLine.includes('// Spanish')) {
    currentLanguage = 'es';
    inLanguageSection = true;
    seenKeys.clear();
    cleanedLines.push(line);
    continue;
  } else if (trimmedLine.includes('de: {') && trimmedLine.includes('// German')) {
    currentLanguage = 'de';
    inLanguageSection = true;
    seenKeys.clear();
    cleanedLines.push(line);
    continue;
  } else if (trimmedLine.includes('ch: {') && trimmedLine.includes('// Swiss German')) {
    currentLanguage = 'ch';
    inLanguageSection = true;
    seenKeys.clear();
    cleanedLines.push(line);
    continue;
  }
  
  // End of language section
  if (inLanguageSection && (trimmedLine === '},') && !trimmedLine.includes(':')) {
    inLanguageSection = false;
    currentLanguage = null;
    cleanedLines.push(line);
    continue;
  }
  
  // Process translation keys within language sections
  if (inLanguageSection && trimmedLine.includes("':")) {
    const keyMatch = trimmedLine.match(/^\s*'([^']+)':/);
    if (keyMatch) {
      const key = keyMatch[1];
      const fullKey = `${currentLanguage}.${key}`;
      
      if (seenKeys.has(key)) {
        console.log(`Removing duplicate key: ${fullKey}`);
        continue; // Skip this duplicate
      } else {
        seenKeys.add(key);
        cleanedLines.push(line);
      }
    } else {
      cleanedLines.push(line);
    }
  } else {
    cleanedLines.push(line);
  }
}

// Write the cleaned content
const cleanedContent = cleanedLines.join('\n');

// Additional cleanup for structural issues
let finalContent = cleanedContent
  // Fix any remaining structural issues
  .replace(/,\s*,/g, ',')
  .replace(/\}\s*,\s*\}/g, '}\n  }')
  // Remove empty lines between language sections
  .replace(/\n\s*\n\s*([a-z]{2}: \{)/g, '\n\n  $1');

// Fix the languageOptions type issue
finalContent = finalContent.replace(
  /languageOptions\.find\(opt => opt\.code === selectedLanguage\)\?\.(\w+)/g,
  'getCountryConfig(selectedLanguage).$1'
);

// Write the file
fs.writeFileSync(filePath, finalContent, 'utf8');

console.log('✅ Translations file cleaned successfully!');
console.log('✅ Removed all duplicate keys');
console.log('✅ Fixed structural issues');
console.log('✅ Fixed type issues');
