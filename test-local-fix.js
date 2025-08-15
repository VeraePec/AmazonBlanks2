// TEST LOCAL FIX - Run this in browser console to test if local filtering is working
// This will test the language filtering logic on your local development server

(async () => {
  try {
    console.log('🧪 TESTING LOCAL FIX - Checking if language filtering is working...');
    
    // STEP 1: Check if we're on localhost
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    console.log(`📍 Current location: ${isLocalhost ? 'localhost' : 'production'}`);
    
    // STEP 2: Check current ad copies in localStorage
    const savedAdCopies = localStorage.getItem('facebookAdCopies');
    if (savedAdCopies) {
      const adCopies = JSON.parse(savedAdCopies);
      console.log(`📊 Found ${adCopies.length} ad copies in localStorage`);
      
      // Show all ad copy IDs
      adCopies.forEach((ad, index) => {
        console.log(`📋 Ad Copy ${index + 1}:`, {
          id: ad.id,
          language: ad.originalLanguage,
          headline: ad.headline.substring(0, 50) + '...'
        });
      });
      
      // Check for proper ID structure
      const hasProperIds = adCopies.every(ad => ad.id.includes('-'));
      if (hasProperIds) {
        console.log('✅ All ad copies have proper ID structure (e.g., keter-storage-shed-no)');
      } else {
        console.log('❌ Some ad copies missing proper ID structure');
      }
      
    } else {
      console.log('❌ No ad copies found in localStorage');
      console.log('💡 You need to run the simple-fix.js script first to create ad copies');
      return;
    }
    
    // STEP 3: Test the filtering logic manually
    console.log('🔍 STEP 3: Testing filtering logic manually...');
    
    const testLanguages = ['gb', 'dk', 'no', 'es', 'ch'];
    testLanguages.forEach(lang => {
      const filtered = adCopies.filter(ad => {
        if (ad.id.includes('-')) {
          const countryCode = ad.id.split('-').pop();
          return countryCode === lang;
        }
        return true;
      });
      
      console.log(`🌍 ${lang.toUpperCase()}: Found ${filtered.length} ad copy(ies)`);
      if (filtered.length > 0) {
        console.log(`   ID: ${filtered[0].id}`);
        console.log(`   Headline: ${filtered[0].headline}`);
        console.log(`   Language: ${filtered[0].originalLanguage}`);
      }
    });
    
    // STEP 4: Check if the Facebook Ads page is using the right filtering
    console.log('🔍 STEP 4: Checking Facebook Ads page filtering...');
    
    // Look for the Facebook Ads page component
    const facebookAdsPage = document.querySelector('[data-testid="facebook-ads-page"]') || 
                           document.querySelector('.facebook-ads-page') ||
                           document.querySelector('main');
    
    if (facebookAdsPage) {
      console.log('✅ Facebook Ads page component found');
      
      // Check if there are ad copy elements
      const adCopyElements = document.querySelectorAll('[data-testid="ad-copy"], .ad-copy, .ad-card');
      console.log(`📱 Found ${adCopyElements.length} ad copy elements on the page`);
      
      if (adCopyElements.length > 0) {
        console.log('✅ Ad copy elements are visible on the page');
        
        // Check the first ad copy for language info
        const firstAd = adCopyElements[0];
        const languageText = firstAd.textContent || '';
        
        if (languageText.includes('Language:')) {
          console.log('✅ Language information is displayed');
          console.log(`   Current language display: ${languageText.match(/Language:\s*([^\n]+)/)?.[1] || 'Not found'}`);
        } else {
          console.log('❌ Language information not found in ad copy');
        }
      } else {
        console.log('❌ No ad copy elements visible on the page');
      }
    } else {
      console.log('❌ Facebook Ads page component not found');
      console.log('💡 Make sure you are on the Facebook Ads page');
    }
    
    console.log('🎉 LOCAL TEST COMPLETED!');
    console.log('💡 If filtering is working correctly, you should see:');
    console.log('   1. Only one ad copy per language when switching');
    console.log('   2. Correct pricing for each language');
    console.log('   3. Proper language labels');
    console.log('   4. Real product images');
    
    // STEP 5: Manual test instructions
    console.log('🧪 MANUAL TEST:');
    console.log('   1. Go to the Facebook Ads page');
    console.log('   2. Switch between languages (GB, DK, NO, ES, CH)');
    console.log('   3. Check if only one ad copy shows per language');
    console.log('   4. Verify pricing changes correctly');
    console.log('   5. Check if language labels update');
    
  } catch (error) {
    console.error('❌ ERROR during local test:', error);
    console.error('Error details:', error.message);
  }
})();
