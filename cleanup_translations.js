const fs = require('fs');
const path = require('path');

// Read the translations file
const filePath = path.join(__dirname, 'src/utils/translations.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Find duplicate keys in each language section
const languageSections = {
  'gb': { start: null, end: null },
  'da': { start: null, end: null },
  'no': { start: null, end: null },
  'es': { start: null, end: null },
  'ch': { start: null, end: null }
};

// Split into lines
const lines = content.split('\n');

// Find language sections
let currentSection = null;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  if (line.includes('gb: {') && line.includes('// English')) {
    languageSections.gb.start = i;
    currentSection = 'gb';
  } else if (line.includes('da: {') && line.includes('// Danish')) {
    if (currentSection === 'gb') languageSections.gb.end = i;
    languageSections.da.start = i;
    currentSection = 'da';
  } else if (line.includes('no: {') && line.includes('// Norwegian')) {
    if (currentSection === 'da') languageSections.da.end = i;
    languageSections.no.start = i;
    currentSection = 'no';
  } else if (line.includes('es: {') && line.includes('// Spanish')) {
    if (currentSection === 'no') languageSections.no.end = i;
    languageSections.es.start = i;
    currentSection = 'es';
  } else if (line.includes('ch: {') && line.includes('// Swiss German')) {
    if (currentSection === 'es') languageSections.es.end = i;
    languageSections.ch.start = i;
    currentSection = 'ch';
  } else if (line === '  }' && currentSection === 'ch') {
    languageSections.ch.end = i;
    currentSection = null;
  }
}

// Function to remove duplicates from a section
function removeDuplicatesFromSection(startLine, endLine) {
  const sectionLines = lines.slice(startLine, endLine);
  const seenKeys = new Set();
  const cleanedLines = [];
  
  for (const line of sectionLines) {
    const trimmed = line.trim();
    
    // Skip comments and structural lines
    if (trimmed.startsWith('//') || trimmed === '{' || trimmed === '}' || trimmed === '' || 
        trimmed.includes(': {') || trimmed.includes('da: {') || trimmed.includes('no: {') || 
        trimmed.includes('es: {') || trimmed.includes('ch: {') || trimmed.includes('gb: {')) {
      cleanedLines.push(line);
      continue;
    }
    
    // Extract key from translation line
    const keyMatch = trimmed.match(/^'([^']+)':/);
    if (keyMatch) {
      const key = keyMatch[1];
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        cleanedLines.push(line);
      } else {
        console.log(`Removing duplicate key: ${key}`);
      }
    } else {
      cleanedLines.push(line);
    }
  }
  
  return cleanedLines;
}

// Clean each section
let newLines = [...lines];

// Process each language section
for (const [lang, section] of Object.entries(languageSections)) {
  if (section.start !== null && section.end !== null) {
    console.log(`Cleaning ${lang} section (lines ${section.start}-${section.end})`);
    const cleanedSection = removeDuplicatesFromSection(section.start, section.end);
    
    // Replace the section in newLines
    newLines.splice(section.start, section.end - section.start, ...cleanedSection);
    
    // Adjust subsequent section positions
    const lineDiff = cleanedSection.length - (section.end - section.start);
    for (const [otherLang, otherSection] of Object.entries(languageSections)) {
      if (otherSection.start > section.start) {
        otherSection.start += lineDiff;
        if (otherSection.end !== null) {
          otherSection.end += lineDiff;
        }
      }
    }
  }
}

// Write the cleaned file
const cleanedContent = newLines.join('\n');
fs.writeFileSync(filePath, cleanedContent, 'utf8');

console.log('Translations file cleaned successfully!');
console.log('Removed duplicate keys from all language sections.');
