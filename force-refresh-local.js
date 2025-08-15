// FORCE REFRESH LOCAL - Run this to clear cache and force refresh on localhost
// This will help ensure the latest code changes are loaded

(async () => {
  try {
    console.log('🔄 FORCE REFRESH LOCAL - Clearing cache and forcing refresh...');
    
    // STEP 1: Clear localStorage
    console.log('🧹 STEP 1: Clearing localStorage...');
    localStorage.removeItem('facebookAdCopies');
    console.log('✅ localStorage cleared');
    
    // STEP 2: Clear sessionStorage
    console.log('🧹 STEP 2: Clearing sessionStorage...');
    sessionStorage.clear();
    console.log('✅ sessionStorage cleared');
    
    // STEP 3: Clear any cached data
    console.log('🧹 STEP 3: Clearing cached data...');
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        console.log('✅ Browser caches cleared');
      } catch (error) {
        console.log('⚠️ Could not clear browser caches:', error.message);
      }
    }
    
    // STEP 4: Force page reload
    console.log('🔄 STEP 4: Force reloading page...');
    console.log('💡 The page will reload in 3 seconds...');
    
    setTimeout(() => {
      console.log('🔄 Reloading page now...');
      window.location.reload(true); // true = force reload from server, not cache
    }, 3000);
    
    console.log('🎉 FORCE REFRESH INITIATED!');
    console.log('💡 After the page reloads:');
    console.log('   1. Run the simple-fix.js script to create ad copies');
    console.log('   2. Test the language switching on Facebook Ads page');
    console.log('   3. Verify that filtering is working correctly');
    
  } catch (error) {
    console.error('❌ ERROR during force refresh:', error);
    console.error('Error details:', error.message);
  }
})();
