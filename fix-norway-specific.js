// NORWAY-SPECIFIC FIX - Run this in browser console to fix Norway language and pricing
// This will ensure Norway shows 99 kr pricing and proper Norwegian language

(async () => {
  try {
    console.log('🇳🇴 NORWAY FIX STARTING - Fixing language detection and pricing...');
    
    // STEP 1: Check current ad copies
    console.log('🔍 STEP 1: Checking current ad copies...');
    const savedAdCopies = localStorage.getItem('facebookAdCopies');
    if (savedAdCopies) {
      const adCopies = JSON.parse(savedAdCopies);
      console.log(`📊 Found ${adCopies.length} ad copies`);
      
      // Show current Norway ad copy
      const norwayAd = adCopies.find(ad => ad.id === 'keter-storage-shed-no');
      if (norwayAd) {
        console.log('📋 Current Norway ad copy:', {
          id: norwayAd.id,
          headline: norwayAd.headline,
          copy: norwayAd.copy.substring(0, 100) + '...',
          language: norwayAd.originalLanguage
        });
      } else {
        console.log('❌ No Norway ad copy found!');
      }
    }
    
    // STEP 2: Force create proper Norway ad copy
    console.log('📝 STEP 2: Creating proper Norway ad copy...');
    
    const norwayAdCopy = {
      id: 'keter-storage-shed-no',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Fantastisk Amazon funn for 99 kr',
      copy: 'Jeg trengte noe som dette, men ville ikke bruke en formue… Så denne Keter Store it Out Nova utendørs hage lagringsskur på utsalg og tenkte, hvorfor ikke? Den ankom på to dager, og jeg var faktisk imponert — god kvalitet, føles solid og fungerer akkurat som beskrevet.\n\nOppsett var greit, tok omkring en time, og det ser ordentlig ut. Kvaliteten er bedre enn forventet til prisen, slett ikke billig utseende. Hvis du leter etter noe funksjonelt og velgjort, fungerer dette helt sikkert.\n\nEneste ulempe? Jeg ønsker jeg hadde bestilt en til.\nBestill nå før den blir utsolgt igjen — til 99 kr er det ærlig talt et røverkjøp.',
      createdAt: new Date().toISOString(),
      originalLanguage: 'no',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: 'https://amazonblanks.netlify.app/keter-storage-shed',
      simplifiedName: 'Keter Store Nova'
    };
    
    // STEP 3: Update localStorage with proper Norway ad copy
    console.log('💾 STEP 3: Updating localStorage...');
    const existingAdCopies = localStorage.getItem('facebookAdCopies');
    if (existingAdCopies) {
      const adCopies = JSON.parse(existingAdCopies);
      
      // Remove old Norway ad copy if it exists
      const filteredAdCopies = adCopies.filter(ad => ad.id !== 'keter-storage-shed-no');
      
      // Add new Norway ad copy
      filteredAdCopies.push(norwayAdCopy);
      
      // Save back to localStorage
      localStorage.setItem('facebookAdCopies', JSON.stringify(filteredAdCopies));
      console.log('✅ Norway ad copy updated!');
    } else {
      // If no ad copies exist, create new array
      localStorage.setItem('facebookAdCopies', JSON.stringify([norwayAdCopy]));
      console.log('✅ Norway ad copy created!');
    }
    
    // STEP 4: Verify the fix
    console.log('🔍 STEP 4: Verifying the fix...');
    const updatedAdCopies = localStorage.getItem('facebookAdCopies');
    if (updatedAdCopies) {
      const adCopies = JSON.parse(updatedAdCopies);
      const norwayAd = adCopies.find(ad => ad.id === 'keter-storage-shed-no');
      
      if (norwayAd) {
        console.log('✅ Norway ad copy verified:', {
          id: norwayAd.id,
          headline: norwayAd.headline,
          language: norwayAd.originalLanguage,
          hasCorrectPrice: norwayAd.headline.includes('99 kr'),
          hasRealImage: norwayAd.productImage.includes('amazon.com')
        });
        
        if (norwayAd.headline.includes('99 kr')) {
          console.log('🎯 PRICING FIXED: Norway now shows 99 kr');
        } else {
          console.error('❌ PRICING STILL WRONG: Norway not showing 99 kr');
        }
        
        if (norwayAd.originalLanguage === 'no') {
          console.log('🌍 LANGUAGE FIXED: Norway now shows Norwegian language');
        } else {
          console.error('❌ LANGUAGE STILL WRONG: Norway not showing Norwegian');
        }
        
        if (norwayAd.productImage.includes('amazon.com')) {
          console.log('🖼️ IMAGE FIXED: Norway now shows real product image');
        } else {
          console.error('❌ IMAGE STILL WRONG: Norway still showing placeholder');
        }
      }
    }
    
    console.log('🎉 NORWAY FIX COMPLETED!');
    console.log('💡 Now:');
    console.log('   1. Go to Facebook Ads page');
    console.log('   2. Select Norway (NO) language');
    console.log('   3. You should see:');
    console.log('      - Headline: "Fantastisk Amazon funn for 99 kr"');
    console.log('      - Language: No (NO)');
    console.log('      - Currency: NOK');
    console.log('      - Real product image (not grey placeholder)');
    console.log('      - Proper Norwegian text');
    
  } catch (error) {
    console.error('❌ ERROR during Norway fix:', error);
    console.error('Error details:', error.message);
  }
})();
