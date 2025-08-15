// Browser script to test country-specific ad copy generation
// Run this in the browser console on any page of your website

(async () => {
  try {
    console.log('🧪 Testing country-specific ad copy generation system...');
    
    // Import the new functions
    const { generateCountrySpecificAdCopies } = await import('./src/utils/generateAdCopy.ts');
    
    // Create test product data for Keter Storage Shed
    const testProductData = {
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
    
    // Test country-specific ad copy generation
    console.log('📦 Generating country-specific ad copies for Keter Storage Shed...');
    await generateCountrySpecificAdCopies(testProductData, 'keter-storage-shed');
    
    console.log('✅ Country-specific ad copies generated!');
    console.log('🎯 Check the Facebook Ads page and switch between languages to see the different ad copies');
    
    // Show what was generated
    const savedAdCopies = localStorage.getItem('facebookAdCopies');
    if (savedAdCopies) {
      const adCopies = JSON.parse(savedAdCopies);
      console.log(`📊 Total ad copies now available: ${adCopies.length}`);
      
      // Show country-specific ad copies
      const countrySpecificAds = adCopies.filter(ad => ad.id.includes('-'));
      console.log('🌍 Country-specific ad copies:', countrySpecificAds.map(ad => ({
        id: ad.id,
        headline: ad.headline.substring(0, 50) + '...',
        price: ad.headline.includes('£') ? 'GB' : 
               ad.headline.includes('64 kr') ? 'DK' :
               ad.headline.includes('100 kr') ? 'NO' :
               ad.headline.includes('€') ? 'ES' :
               ad.headline.includes('CHF') ? 'CH' : 'Unknown'
      })));
    }
    
    console.log('🎉 Test completed! Now go to Facebook Ads page and test the language selector');
    
  } catch (error) {
    console.error('❌ Error testing country-specific ad copy generation:', error);
  }
})();
