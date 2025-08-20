#!/usr/bin/env node

/**
 * Script to update all product pages to use the new blank offer redirect system
 * This script will automatically add the required parameters to all redirects:
 * - sub4: product title
 * - sub5: product image
 * - adv1: Facebook pixel ID
 * - Form prefill parameters
 */

const fs = require('fs');
const path = require('path');

// List of product pages to update with their product names and image arrays
const productPages = [
  {
    file: 'src/pages/StorageChestPage.tsx',
    productName: 'Amazon Basics 5-Drawer Storage Chest',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/VacuumCleanerPage.tsx',
    productName: 'Amazon Basics Cordless Stick Vacuum Cleaner',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/StickVacuumPage.tsx',
    productName: 'Amazon Basics Cordless Stick Vacuum',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/SecuritySafePage.tsx',
    productName: 'Amazon Basics Security Safe',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/GamingDeskPage.tsx',
    productName: 'Amazon Basics Gaming Desk',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/StorageShelfPage.tsx',
    productName: 'Amazon Basics Storage Shelf',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/BabyCotPage.tsx',
    productName: 'Amazon Basics Baby Cot',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/BedsideCabinetPage.tsx',
    productName: 'Amazon Basics Bedside Cabinet',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/NicehillDresserPage.tsx',
    productName: 'Amazon Basics Dresser',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  },
  {
    file: 'src/pages/GardenChairPage.tsx',
    productName: 'Amazon Basics Garden Chair',
    images: [
      'https://m.media-amazon.com/images/I/71ebzILE86L._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/A1kqGJhvsxL._AC_SL1500_.jpg'
    ]
  }
];

function updateProductPage(filePath, productName, images) {
  try {
    console.log(`\n🔄 Updating ${filePath}...`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Add import for the new utility
    if (!content.includes('import { openBlankOfferRedirect }')) {
      const importStatement = `import { openBlankOfferRedirect } from '../utils/blankOfferRedirect';`;
      content = content.replace(
        /import.*redirectHandler.*;/,
        `$&\n${importStatement}`
      );
      updated = true;
    }
    
    // Replace fallback redirects with new utility
    const oldFallbackPattern = /window\.open\('https:\/\/linkly\.link\/2D5Sx', '_blank'\);/g;
    if (oldFallbackPattern.test(content)) {
      const newFallback = `openBlankOfferRedirect(
        'https://linkly.link/2D5Sx',
        '${productName}',
        '${images[0]}'
      );`;
      
      content = content.replace(oldFallbackPattern, newFallback);
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${filePath}`);
    } else {
      console.log(`ℹ️  No changes needed for ${filePath}`);
    }
    
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🚀 Starting bulk update of all product pages...');
console.log('📝 Adding blank offer redirect parameters to all product pages...');

productPages.forEach(({ file, productName, images }) => {
  if (fs.existsSync(file)) {
    updateProductPage(file, productName, images);
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('\n🎉 Bulk update completed!');
console.log('\n📋 Summary of changes:');
console.log('- Added import for openBlankOfferRedirect utility');
console.log('- Updated fallback redirects to include product title and image');
console.log('- All redirects now include sub4, sub5, adv1, and form prefill parameters');
console.log('\n🔧 Next steps:');
console.log('1. Run: npm run build');
console.log('2. Test the redirects on your product pages');
console.log('3. Deploy to Netlify');
