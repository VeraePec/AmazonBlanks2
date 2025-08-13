import fs from 'fs';
import path from 'path';

// List of all product page files
const productPages = [
  'src/pages/BedsideCabinetPage.tsx',
  'src/pages/StorageOrganizerPage.tsx',
  'src/pages/NicehillDresserPage.tsx',
  'src/pages/VacuumCleanerPage.tsx',
  'src/pages/StorageShelfPage.tsx',
  'src/pages/SecuritySafePage.tsx',
  'src/pages/StickVacuumPage.tsx',
  'src/pages/GamingDeskPage.tsx',
  'src/pages/GardenChairPage.tsx',
  'src/pages/BabyCotPage.tsx',
  'src/pages/StorageChestPage.tsx'
];

function fixProductPage(filePath) {
  console.log(`Fixing ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix 1: Remove urgency messages (mobile version)
  content = content.replace(
    /<div className="text-xs text-red-600 font-bold flex items-center mt-1">\s*<Zap className="w-3 h-3 mr-1" \/>\s*Only \d+ left in stock!<\/div>/g,
    ''
  );
  
  // Fix 2: Remove urgency messages (desktop version)
  content = content.replace(
    /<div className="text-xs text-red-600 font-bold">⚡ \{getTranslation\('product\.only\.left', getCountryConfig\(selectedCountry\.code\)\.language, \{ count: '\d+' \}\)\}<\/div>/g,
    ''
  );
  
  // Fix 3: Remove conflicting delivery information (paid delivery lines)
  content = content.replace(
    /<div className="text-xs text-gray-600">\s*\{formatPrice\('£[\d.]+', selectedCountry\.code\)\} delivery Tuesday, 12 August\s*<\/div>/g,
    ''
  );
  
  // Fix 4: Replace delivery.to with proper delivery info
  content = content.replace(
    /<div className="text-xs text-gray-600">\s*\{getTranslation\('product\.delivery\.to', getCountryConfig\(selectedCountry\.code\)\.language, \{ country: getCountryConfig\(selectedCountry\.code\)\.name \}\)\}\s*<\/div>/g,
    '<div className="text-xs text-[#007185] font-medium">\n                  {getDeliveryInfo()}\n                </div>'
  );
  
  // Fix 5: Clean up extra whitespace and formatting
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed ${filePath}`);
}

// Fix all product pages
productPages.forEach(fixProductPage);

console.log('\n🎉 All product pages have been fixed!');
console.log('Changes made:');
console.log('1. ✅ Removed urgency messages ("Only X left in stock!")');
console.log('2. ✅ Removed conflicting delivery information (paid delivery)');
console.log('3. ✅ Fixed delivery translation keys');
console.log('4. ✅ Applied consistent delivery format'); 