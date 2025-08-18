// Fix existing ad copies to have proper English display names and correct URLs
// Run this in browser console to fix existing ad copies

(async () => {
  try {
    console.log('🔧 Fixing existing ad copies...');
    
    const existingAdCopies = JSON.parse(localStorage.getItem('facebookAdCopies') || '[]');
    
    if (existingAdCopies.length === 0) {
      console.log('❌ No existing ad copies found');
      return;
    }
    
    console.log(`📊 Found ${existingAdCopies.length} existing ad copies`);
    
    // Fix each ad copy
    const fixedAdCopies = existingAdCopies.map(adCopy => {
      // Add displayName for proper English display
      if (adCopy.id.includes('keter-storage-shed')) {
        return {
          ...adCopy,
          displayName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
          productUrl: 'https://amazonblanks.netlify.app/keter-storage-shed' // Ensure correct URL
        };
      } else if (adCopy.id.includes('keter-eden-bench')) {
        return {
          ...adCopy,
          displayName: 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box',
          productUrl: 'https://amazonblanks.netlify.app/keter-eden-bench' // Ensure correct URL
        };
      } else {
        // For other products, use the productName as displayName
        return {
          ...adCopy,
          displayName: adCopy.productName
        };
      }
    });
    
    // Save the fixed ad copies
    localStorage.setItem('facebookAdCopies', JSON.stringify(fixedAdCopies));
    
    console.log('✅ Successfully fixed existing ad copies!');
    console.log(`📊 Total ad copies: ${fixedAdCopies.length}`);
    
    // Verify the fixes
    const savedCopies = JSON.parse(localStorage.getItem('facebookAdCopies') || '[]');
    const keterCopies = savedCopies.filter(ad => ad.id.includes('keter'));
    
    console.log('\n🎯 Keter Ad Copies Fixed:');
    keterCopies.forEach(ad => {
      console.log(`  ${ad.id}:`);
      console.log(`    Display Name: ${ad.displayName}`);
      console.log(`    Product URL: ${ad.productUrl}`);
    });
    
    console.log('\n🎉 All existing ad copies have been fixed!');
    console.log('Refresh the Facebook Ads page to see the changes.');
    
  } catch (error) {
    console.error('❌ Error fixing ad copies:', error);
  }
})();
