// Browser script to clean up duplicate ad copies and regenerate with correct pricing
// Run this in the browser console on any page of your website

(async () => {
  try {
    console.log('🧹 Cleaning up duplicate ad copies and regenerating with correct pricing...');
    
    // Clear all existing ad copies for Keter Storage Shed
    const savedAdCopies = localStorage.getItem('facebookAdCopies');
    if (savedAdCopies) {
      const adCopies = JSON.parse(savedAdCopies);
      console.log(`📊 Found ${adCopies.length} existing ad copies`);
      
      // Remove all ad copies related to Keter Storage Shed
      const filteredAdCopies = adCopies.filter(ad => 
        !ad.id.includes('keter') && 
        !ad.productName.includes('Keter') &&
        !ad.id.includes('storage')
      );
      
      console.log(`🗑️ Removed ${adCopies.length - filteredAdCopies.length} Keter-related ad copies`);
      console.log(`📊 Remaining ad copies: ${filteredAdCopies.length}`);
      
      // Save the cleaned list
      localStorage.setItem('facebookAdCopies', JSON.stringify(filteredAdCopies));
    }
    
    // Import the ad copy generation functions
    const { generateAndSaveAdCopyForProduct } = await import('./src/utils/generateAdCopy.ts');
    
    // Create the product data with correct pricing for each country
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
    
    // Generate fresh ad copy with correct pricing
    console.log('📦 Generating fresh ad copy for Keter Storage Shed...');
    await generateAndSaveAdCopyForProduct(keterProductData, 'keter-storage-shed');
    
    console.log('✅ Fresh ad copy generated!');
    console.log('🎯 Check the Facebook Ads page to see the correct pricing and images');
    
    // Show what was generated
    const newAdCopies = localStorage.getItem('facebookAdCopies');
    if (newAdCopies) {
      const adCopies = JSON.parse(newAdCopies);
      console.log(`📊 Total ad copies now available: ${adCopies.length}`);
      
      // Show Keter ad copy details
      const keterAd = adCopies.find(ad => ad.id === 'keter-storage-shed');
      if (keterAd) {
        console.log('📋 Keter ad copy details:', {
          id: keterAd.id,
          productName: keterAd.productName,
          headline: keterAd.headline,
          productImage: keterAd.productImage,
          productUrl: keterAd.productUrl
        });
      }
    }
    
    console.log('🎉 Cleanup and regeneration completed!');
    console.log('💡 Now visit the Keter Storage Shed page to trigger proper ad copy generation with correct pricing');
    
  } catch (error) {
    console.error('❌ Error during cleanup and regeneration:', error);
  }
})();
