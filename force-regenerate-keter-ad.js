// Browser script to force regenerate the Keter Storage Shed ad copy with correct image
// Run this in the browser console on any page of your website

(async () => {
  try {
    console.log('🔄 Force regenerating Keter Storage Shed ad copy with correct image...');
    
    // Import the ad copy generation functions
    const { generateAndSaveAdCopyForProduct } = await import('./src/utils/generateAdCopy.ts');
    
    // Create the product data object with images
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
    
    // Force regenerate the ad copy
    console.log('📦 Regenerating ad copy for Keter Storage Shed...');
    await generateAndSaveAdCopyForProduct(keterProductData, 'keter-storage-shed');
    
    console.log('✅ Keter Storage Shed ad copy force regenerated!');
    console.log('🎯 Check the Facebook Ads page to see the correct thumbnail image');
    
    // Show a summary of what was generated
    const savedAdCopies = localStorage.getItem('facebookAdCopies');
    if (savedAdCopies) {
      const adCopies = JSON.parse(savedAdCopies);
      const keterAd = adCopies.find(ad => ad.id === 'keter-storage-shed');
      if (keterAd) {
        console.log('📊 Keter ad copy details:', {
          id: keterAd.id,
          productName: keterAd.productName,
          productImage: keterAd.productImage,
          productUrl: keterAd.productUrl
        });
      }
    }
    
  } catch (error) {
    console.error('❌ Error force regenerating Keter ad copy:', error);
  }
})();
