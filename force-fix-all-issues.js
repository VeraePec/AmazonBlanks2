// COMPREHENSIVE FIX SCRIPT - Run this in browser console to fix ALL issues
// This will completely clear localStorage and regenerate everything with correct pricing and images

(async () => {
  try {
    console.log('🚨 COMPREHENSIVE FIX STARTING - This will fix ALL issues...');
    
    // STEP 1: COMPLETELY CLEAR ALL EXISTING AD COPIES
    console.log('🧹 STEP 1: Clearing ALL existing ad copies...');
    localStorage.removeItem('facebookAdCopies');
    console.log('✅ All ad copies cleared from localStorage');
    
    // STEP 2: IMPORT THE NEW FUNCTIONS
    console.log('📦 STEP 2: Importing new ad copy generation functions...');
    const { generateCountrySpecificAdCopies } = await import('./src/utils/generateAdCopy.ts');
    console.log('✅ New functions imported successfully');
    
    // STEP 3: CREATE PRODUCT DATA WITH CORRECT IMAGES
    console.log('🖼️ STEP 3: Creating product data with correct images...');
    const keterProductData = {
      name: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      aboutThisItem: [
        'Ideal outdoor storage solution for garden tools and equipment, BBQ and accessories and x2 120L wheelie bins.',
        'Elegant wood effect panels that opens from the top or the front and with a lockable feature for secure closure.',
        'Heavy-duty floor with built-in support for shelving and 880 L capacity.',
        'Shelves not included'
      ],
      features: [
        'Lockable design for secure closure',
        'UV resistant and weatherproof construction',
        '880L storage capacity',
        'Light grey with dark grey lid',
        'Resin construction for durability',
        'Waterproof and weatherproof',
        'Built-in security features',
        'Built-in shelf support',
        'Ventilated design',
        'Heavy-duty floor',
        'Easy assembly',
        'Outdoor storage solution'
      ],
      images: [
        'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/910TF1aqBKL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/91L1fuj4+hL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81ByjoSNTZL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/911s9OrxX-L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/611Ypdn2IlL._AC_SL1500_.jpg'
      ],
      breadcrumb: ['Home', 'Garden & Outdoor', 'Storage'],
      price: '£9.99',
      originalPrice: '£14.99'
    };
    
    // STEP 4: FORCE GENERATE COUNTRY-SPECIFIC AD COPIES
    console.log('🌍 STEP 4: Generating country-specific ad copies with correct pricing...');
    await generateCountrySpecificAdCopies(keterProductData, 'keter-storage-shed');
    console.log('✅ Country-specific ad copies generated!');
    
    // STEP 5: VERIFY WHAT WAS CREATED
    console.log('🔍 STEP 5: Verifying generated ad copies...');
    const newAdCopies = localStorage.getItem('facebookAdCopies');
    if (newAdCopies) {
      const adCopies = JSON.parse(newAdCopies);
      console.log(`📊 Total ad copies now available: ${adCopies.length}`);
      
      // Show details for each country
      adCopies.forEach((ad, index) => {
        console.log(`📋 Ad Copy ${index + 1}:`, {
          id: ad.id,
          productName: ad.productName,
          headline: ad.headline,
          productImage: ad.productImage,
          productUrl: ad.productUrl
        });
      });
      
      // Check for duplicates
      const ids = adCopies.map(ad => ad.id);
      const uniqueIds = [...new Set(ids)];
      if (ids.length !== uniqueIds.length) {
        console.warn('⚠️ DUPLICATES DETECTED! Some ad copies have the same ID');
      } else {
        console.log('✅ No duplicates detected - all IDs are unique');
      }
      
      // Check image URLs
      const imagesWithPlaceholders = adCopies.filter(ad => 
        ad.productImage === '/placeholder.svg' || 
        ad.productImage.includes('placeholder') ||
        !ad.productImage
      );
      
      if (imagesWithPlaceholders.length > 0) {
        console.warn('⚠️ PLACEHOLDER IMAGES DETECTED! Some ad copies still have placeholder images');
        imagesWithPlaceholders.forEach(ad => {
          console.warn(`   - ${ad.id}: ${ad.productImage}`);
        });
      } else {
        console.log('✅ All ad copies have real product images');
      }
      
    } else {
      console.error('❌ No ad copies found in localStorage after generation!');
    }
    
    console.log('🎉 COMPREHENSIVE FIX COMPLETED!');
    console.log('💡 Now go to the Facebook Ads page to see the results');
    console.log('🔍 Check that:');
    console.log('   1. No duplicates exist');
    console.log('   2. Each country has correct pricing (DK: 63.58 kr, NO: 99 kr)');
    console.log('   3. Real product images are displayed (not grey placeholders)');
    
  } catch (error) {
    console.error('❌ ERROR during comprehensive fix:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
  }
})();
