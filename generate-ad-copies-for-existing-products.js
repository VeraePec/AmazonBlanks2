// Browser script to generate Facebook ad copies for existing ProductPageTemplate products
// Run this in the browser console on any page of your website

(async () => {
  try {
    console.log('🚀 Starting ad copy generation for existing ProductPageTemplate products...');
    
    // Import the ad copy generation functions
    const { generateAdCopiesForAllProductPageTemplateProducts, generateAdCopyForProductByName } = await import('./src/utils/generateAdCopy.ts');
    
    // Generate ad copy for the Keter Storage Shed specifically
    console.log('📦 Generating ad copy for Keter Storage Shed...');
    await generateAdCopyForProductByName('Keter Store it Out Nova');
    
    // Generate ad copies for all other ProductPageTemplate products
    console.log('📦 Generating ad copies for all other ProductPageTemplate products...');
    await generateAdCopiesForAllProductPageTemplateProducts();
    
    console.log('✅ Ad copy generation completed!');
    console.log('🎯 Check the Facebook Ads page to see your new ad copies');
    
    // Show a summary of what was generated
    const savedAdCopies = localStorage.getItem('facebookAdCopies');
    if (savedAdCopies) {
      const adCopies = JSON.parse(savedAdCopies);
      console.log(`📊 Total ad copies now available: ${adCopies.length}`);
      console.log('📋 Available ad copies:', adCopies.map(ad => ad.productName));
    }
    
  } catch (error) {
    console.error('❌ Error running ad copy generation:', error);
  }
})();
