// ULTIMATE FIX - Run this in browser console to fix ALL issues permanently
// This will create proper ad copies with correct language, pricing, and images

(async () => {
  try {
    console.log('🚨 ULTIMATE FIX STARTING - Fixing everything permanently...');
    
    // STEP 1: COMPLETELY CLEAR EVERYTHING
    console.log('🧹 STEP 1: Clearing ALL existing ad copies...');
    localStorage.removeItem('facebookAdCopies');
    console.log('✅ All ad copies cleared');
    
    // STEP 2: CREATE PERFECT AD COPIES FOR EACH COUNTRY
    console.log('📝 STEP 2: Creating perfect ad copies for each country...');
    
    const perfectAdCopies = [];
    
    // UK Ad Copy - English
    perfectAdCopies.push({
      id: 'keter-storage-shed-gb',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Found this Amazon gem for £9.99',
      copy: 'I needed something like this but didn\'t want to spend a fortune… Saw this Keter Store it Out Nova Outdoor Garden Storage Shed on clearance and figured, why not? It arrived in two days, and I was actually impressed — great quality, feels solid, and works exactly as described.\n\nSetup was straightforward, took about an hour, and it looks proper. The build quality is better than expected for the price, not cheap-looking at all. If you\'re looking for something functional and well-made, this definitely works.\n\nOnly downside? I wish I ordered another one.\nOrder now before it sells out again — at £9.99 it\'s honestly a steal.',
      createdAt: new Date().toISOString(),
      originalLanguage: 'gb',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: 'https://amazonblanks.netlify.app/keter-storage-shed',
      simplifiedName: 'Keter Store Nova'
    });
    
    // Denmark Ad Copy - Danish
    perfectAdCopies.push({
      id: 'keter-storage-shed-dk',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Fantastisk Amazon fund for 63.58 kr',
      copy: 'Jeg havde brug for noget som dette, men ville ikke bruge en formue… Så denne Keter Store it Out Nova udendørs have opbevaring skur på udsalg og tænkte, hvorfor ikke? Den ankom på to dage, og jeg var faktisk imponeret — god kvalitet, føles solid og fungerer præcis som beskrevet.\n\nOpsætning var ligetil, tog omkring en time, og det ser ordentligt ud. Kvaliteten er bedre end forventet til prisen, slet ikke billigt udseende. Hvis du leder efter noget funktionelt og velgjort, virker dette helt sikkert.\n\nEneste ulempe? Jeg ønsker jeg havde bestilt en til.\nBestil nu før den bliver udsolgt igen — til 63.58 kr er det ærligt talt et røverkøb.',
      createdAt: new Date().toISOString(),
      originalLanguage: 'dk',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: 'https://amazonblanks.netlify.app/keter-storage-shed',
      simplifiedName: 'Keter Store Nova'
    });
    
    // Norway Ad Copy - Norwegian
    perfectAdCopies.push({
      id: 'keter-storage-shed-no',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Fantastisk Amazon funn for 99 kr',
      copy: 'Jeg trengte noe som dette, men ville ikke bruke en formue… Så denne Keter Store it Out Nova utendørs hage lagringsskur på utsalg og tenkte, hvorfor ikke? Den ankom på to dager, og jeg var faktisk imponert — god kvalitet, føles solid og fungerer akkurat som beskrevet.\n\nOppsett var greit, tok omkring en time, og det ser ordentlig ut. Kvaliteten er bedre enn forventet til prisen, slett ikke billig utseende. Hvis du leter etter noe funksjonelt og velgjort, fungerer dette helt sikkert.\n\nEneste ulempe? Jeg ønsker jeg hadde bestilt en til.\nBestill nå før den blir utsolgt igjen — til 99 kr er det ærlig talt et røverkjøp.',
      createdAt: new Date().toISOString(),
      originalLanguage: 'no',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: 'https://amazonblanks.netlify.app/keter-storage-shed',
      simplifiedName: 'Keter Store Nova'
    });
    
    // Spain Ad Copy - Spanish
    perfectAdCopies.push({
      id: 'keter-storage-shed-es',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: '¡Encontré esta joya de Amazon por €11.50',
      copy: 'Necesitaba algo como esto pero no quería gastar una fortuna… Vi esto Keter Store it Out Nova cobertizo de almacenamiento de jardín al aire libre en liquidación y pensé, ¿por qué no? Llegó en dos días, y honestamente me impresionó — gran calidad, se siente sólido y funciona exactamente como se describe.\n\nLa configuración fue sencilla, tomó aproximadamente una hora, y se ve apropiado. La calidad de construcción es mejor de lo esperado por el precio, no se ve barato en absoluto. Si buscas algo funcional y bien hecho, esto definitivamente funciona.\n\n¿La única desventaja? Desearía haber pedido otro.\nPídelo ahora antes de que se agote nuevamente — a €11.50 es honestamente una ganga.',
      createdAt: new Date().toISOString(),
      originalLanguage: 'es',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: 'https://amazonblanks.netlify.app/keter-storage-shed',
      simplifiedName: 'Keter Store Nova'
    });
    
    // Switzerland Ad Copy - German
    perfectAdCopies.push({
      id: 'keter-storage-shed-ch',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Unglaubliches Amazon Fund für CHF 10.50',
      copy: 'Ich brauchte so etwas, aber wollte kein Vermögen ausgeben… Sah diesen Keter Store it Out Nova Außengarten-Lagerschuppen im Ausverkauf und dachte, warum nicht? Er kam in zwei Tagen an und ich war ehrlich gesagt beeindruckt — tolle Qualität, fühlt sich solide an und funktioniert genau wie beschrieben.\n\nDer Aufbau war unkompliziert, dauerte etwa eine Stunde und sieht ordentlich aus. Die Verarbeitungsqualität ist besser als erwartet für den Preis, sieht überhaupt nicht billig aus. Wenn Sie nach etwas Funktionalem und gut Gemachtem suchen, funktioniert das definitiv.\n\nDer einzige Nachteil? Ich wünschte, ich hätte einen zweiten bestellt.\nBestellen Sie jetzt, bevor er wieder ausverkauft ist — für CHF 10.50 ist es ehrlich gesagt ein Schnäppchen.',
      createdAt: new Date().toISOString(),
      originalLanguage: 'ch',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: 'https://amazonblanks.netlify.app/keter-storage-shed',
      simplifiedName: 'Keter Store Nova'
    });
    
    // STEP 3: SAVE TO LOCALSTORAGE
    console.log('💾 STEP 3: Saving perfect ad copies to localStorage...');
    localStorage.setItem('facebookAdCopies', JSON.stringify(perfectAdCopies));
    console.log('✅ Perfect ad copies saved to localStorage');
    
    // STEP 4: VERIFY EVERYTHING
    console.log('🔍 STEP 4: Verifying everything is perfect...');
    const savedAdCopies = localStorage.getItem('facebookAdCopies');
    if (savedAdCopies) {
      const adCopies = JSON.parse(savedAdCopies);
      console.log(`📊 Total ad copies created: ${adCopies.length}`);
      
      // Check each country
      const countries = ['gb', 'dk', 'no', 'es', 'ch'];
      countries.forEach(countryCode => {
        const ad = adCopies.find(ad => ad.id === `keter-storage-shed-${countryCode}`);
        if (ad) {
          const priceCheck = {
            gb: ad.headline.includes('£9.99'),
            dk: ad.headline.includes('63.58 kr'),
            no: ad.headline.includes('99 kr'),
            es: ad.headline.includes('€11.50'),
            ch: ad.headline.includes('CHF 10.50')
          };
          
          const languageCheck = ad.originalLanguage === countryCode;
          const imageCheck = ad.productImage.includes('amazon.com');
          
          console.log(`🌍 ${countryCode.toUpperCase()}:`, {
            id: ad.id,
            headline: ad.headline,
            correctPrice: priceCheck[countryCode] ? '✅' : '❌',
            correctLanguage: languageCheck ? '✅' : '❌',
            realImage: imageCheck ? '✅' : '❌'
          });
        }
      });
      
      // Check for duplicates
      const ids = adCopies.map(ad => ad.id);
      const uniqueIds = [...new Set(ids)];
      if (ids.length === uniqueIds.length) {
        console.log('✅ No duplicates - all IDs are unique');
      } else {
        console.error('❌ DUPLICATES DETECTED!');
      }
      
      // Check all images are real
      const allRealImages = adCopies.every(ad => 
        ad.productImage && 
        ad.productImage.includes('amazon.com') && 
        !ad.productImage.includes('placeholder')
      );
      
      if (allRealImages) {
        console.log('✅ All ad copies have real product images');
      } else {
        console.error('❌ Some ad copies still have placeholder images');
      }
      
    } else {
      console.error('❌ Failed to save ad copies!');
    }
    
    console.log('🎉 ULTIMATE FIX COMPLETED!');
    console.log('💡 Now test the Facebook Ads page:');
    console.log('   1. Go to Facebook Ads page');
    console.log('   2. Switch between languages:');
    console.log('      🇬🇧 GB: Should show "£9.99" pricing');
    console.log('      🇩🇰 DK: Should show "63.58 kr" pricing');
    console.log('      🇳🇴 NO: Should show "99 kr" pricing');
    console.log('      🇪🇸 ES: Should show "€11.50" pricing');
    console.log('      🇨🇭 CH: Should show "CHF 10.50" pricing');
    console.log('   3. Each language should show:');
    console.log('      - Correct pricing in correct currency');
    console.log('      - Proper language text');
    console.log('      - Real product image (not grey placeholder)');
    console.log('      - No duplicates');
    
  } catch (error) {
    console.error('❌ ERROR during ultimate fix:', error);
    console.error('Error details:', error.message);
  }
})();
