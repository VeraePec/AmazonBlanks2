// Generate Facebook Ad Copies for Keter Eden Bench
// Run this in browser console to create authentic ad copies

(async () => {
  try {
    console.log('🚀 Generating Keter Eden Bench Facebook Ad Copies...');
    
    // Clear existing ad copies for this product
    const existingAdCopies = JSON.parse(localStorage.getItem('facebookAdCopies') || '[]');
    const filteredAdCopies = existingAdCopies.filter(ad => !ad.id.includes('keter-eden-bench'));
    
    // Create new ad copies with the authentic style
    const newAdCopies = [
      // UK - English
      {
        id: 'keter-eden-bench-gb',
        productName: 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box',
        headline: 'Amazon clearance secret: £15 bench for £9.99',
        copy: 'Okay, I need to share this because I still can\'t believe it happened. I was scrolling through Amazon last night, not planning to buy anything, when I stumbled across this Keter Eden storage bench that\'s normally £15+ for just £9.99.\n\nAt first I thought it was a mistake or some scam, but nope - it\'s legit. Amazon has these hidden clearance sales that almost nobody knows about. I grabbed it immediately because I\'ve been needing outdoor storage space for ages.\n\nIt arrived today and honestly? The quality is insane for the price. Solid build, proper materials, not some flimsy rubbish. I\'m genuinely shocked they\'re selling it this cheap.\n\nIf you need outdoor storage and seating, grab this NOW before they realise the pricing error and put it back up to £15+. Link in comments - thank me later!',
        createdAt: new Date().toISOString(),
        originalLanguage: 'gb',
        productImage: 'https://m.media-amazon.com/images/I/61dr8C-RdeL._AC_SL1500_.jpg',
        productUrl: 'https://amazonblanks.netlify.app/keter-eden-bench',
        simplifiedName: 'Keter Eden Bench',
        displayName: 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box'
      },
      
      // Denmark - Danish
      {
        id: 'keter-eden-bench-dk',
        productName: 'Keter Eden Bænk 265L Udendørs Have Møbel Opbevaringsboks',
        headline: 'Amazon udsalgshemmelighed: 85 kr bænk for 63 kr',
        copy: 'Okay, jeg er nødt til at dele dette, for jeg kan stadig ikke tro det skete. Jeg scrolled gennem Amazon i går aftes, uden at planlægge at købe noget, da jeg stødte på denne Keter Eden opbevaringsbænk, der normalt koster 85+ kr, for kun 63 kr.\n\nFørst troede jeg det var en fejl eller et scam, men nej - det er ægte. Amazon har disse skjulte udsalg, som næsten ingen ved noget om. Jeg snuppede den med det samme, fordi jeg har haft brug for udendørs opbevaringsplads i evigheder.\n\nDen ankom i dag og ærligt? Kvaliteten er vanvittig for prisen. Solid byggekvalitet, ordentlige materialer, ikke noget skrøbeligt lort. Jeg er oprigtigt chokeret over, at de sælger den så billigt.\n\nHvis du har brug for udendørs opbevaring og siddeplads, snup denne NU, før de opdager prisfejlen og sætter den tilbage op på 85 kr. Link i kommentarerne - tak mig senere!',
        createdAt: new Date().toISOString(),
        originalLanguage: 'dk',
        productImage: 'https://m.media-amazon.com/images/I/61dr8C-RdeL._AC_SL1500_.jpg',
        productUrl: 'https://amazonblanks.netlify.app/keter-eden-bench',
        simplifiedName: 'Keter Eden Bænk',
        displayName: 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box'
      },
      
      // Norway - Norwegian
      {
        id: 'keter-eden-bench-no',
        productName: 'Keter Eden Benk 265L Utenomshus Hagemøbel Lagringsboks',
        headline: 'Amazon utsalgshemmelighet: 130 kr benk for 99 kr',
        copy: 'Okay, jeg må dele dette, for jeg kan fortsatt ikke tro det skjedde. Jeg scrollet gjennom Amazon i går kveld, uten å planlegge å kjøpe noe, da jeg støtte på denne Keter Eden lagringsbenk, som normalt koster 130+ kr, for bare 99 kr.\n\nFørst trodde jeg det var en feil eller et scam, men nei - det er ekte. Amazon har disse skjulte utsalg, som nesten ingen vet om. Jeg snappet den med det samme, fordi jeg har trengt utendørs lagringsplass i evigheter.\n\nDen ankom i dag og ærlig? Kvaliteten er vanvittig for prisen. Solid byggekvalitet, ordentlige materialer, ikke noe skrøpelig dritt. Jeg er oppriktig sjokkert over at de selger den så billig.\n\nHvis du trenger utendørs lagring og sitteplass, snapp denne NÅ, før de oppdager prisfeilen og setter den tilbake opp på 130 kr. Link i kommentarene - takk meg senere!',
        createdAt: new Date().toISOString(),
        originalLanguage: 'no',
        productImage: 'https://m.media-amazon.com/images/I/61dr8C-RdeL._AC_SL1500_.jpg',
        productUrl: 'https://amazonblanks.netlify.app/keter-eden-bench',
        simplifiedName: 'Keter Eden Benk',
        displayName: 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box'
      },
      
      // Spain - Spanish
      {
        id: 'keter-eden-bench-es',
        productName: 'Keter Eden Banco 265L Caja de Almacenamiento de Muebles de Jardín al Aire Libre',
        headline: 'Secreto de liquidación Amazon: banco de €17.25 por €11.50',
        copy: 'Vale, necesito compartir esto porque aún no me lo puedo creer. Estaba navegando por Amazon anoche, sin intención de comprar nada, cuando me topé con este banco de almacenamiento Keter Eden que normalmente cuesta €17.25+ por solo €11.50.\n\nAl principio pensé que era un error o una estafa, pero no - es real. Amazon tiene estas liquidaciones secretas que casi nadie conoce. Lo compré inmediatamente porque llevo tiempo necesitando espacio de almacenamiento exterior.\n\nLlegó hoy y honestamente? La calidad es increíble para el precio. Construcción sólida, materiales buenos, no es basura frágil. Estoy genuinamente sorprendido de que lo estén vendiendo tan barato.\n\nSi necesitas almacenamiento y asiento exterior, cómpralo AHORA antes de que se den cuenta del error de precio y lo pongan de vuelta a €17.25. Enlace en comentarios - ¡agradéceme después!',
        createdAt: new Date().toISOString(),
        originalLanguage: 'es',
        productImage: 'https://m.media-amazon.com/images/I/61dr8C-RdeL._AC_SL1500_.jpg',
        productUrl: 'https://amazonblanks.netlify.app/keter-eden-bench',
        simplifiedName: 'Keter Eden Banco',
        displayName: 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box'
      },
      
      // Switzerland - German
      {
        id: 'keter-eden-bench-ch',
        productName: 'Keter Eden Bank 265L Außengarten-Möbel-Lagerbox',
        headline: 'Amazon Ausverkaufsgeheimnis: 15 CHF Bank für 10.50',
        copy: 'Okay, ich muss das teilen, weil ich es immer noch nicht glauben kann. Ich habe gestern Abend durch Amazon gescrollt, ohne vorzuhaben, etwas zu kaufen, als ich auf diese Keter Eden-Lagerbank gestoßen bin, die normalerweise 15+ CHF kostet, für nur 10.50 CHF.\n\nZuerst dachte ich, es sei ein Fehler oder ein Betrug, aber nein - es ist echt. Amazon hat diese versteckten Ausverkäufe, von denen fast niemand weiß. Ich habe sie sofort gekauft, weil ich schon ewig Außenlagerplatz brauche.\n\nSie kam heute an und ehrlich? Die Qualität ist verrückt für den Preis. Solide Verarbeitung, ordentliche Materialien, kein wackeliger Schrott. Ich bin echt schockiert, dass sie sie so billig verkaufen.\n\nWenn du Außenlagerung und Sitzgelegenheit brauchst, schnapp sie dir JETZT, bevor sie den Preisirrtum bemerken und sie wieder auf 15 CHF setzen. Link in den Kommentaren - danke mir später!',
        createdAt: new Date().toISOString(),
        originalLanguage: 'ch',
        productImage: 'https://m.media-amazon.com/images/I/61dr8C-RdeL._AC_SL1500_.jpg',
        productUrl: 'https://amazonblanks.netlify.app/keter-eden-bench',
        simplifiedName: 'Keter Eden Bank',
        displayName: 'Keter Eden Bench 265L Outdoor Garden Furniture Storage Box'
      }
    ];
    
    // Combine existing and new ad copies
    const allAdCopies = [...filteredAdCopies, ...newAdCopies];
    localStorage.setItem('facebookAdCopies', JSON.stringify(allAdCopies));
    
    console.log('✅ Successfully generated Keter Eden Bench ad copies!');
    console.log(`📊 Total ad copies: ${allAdCopies.length}`);
    console.log(`🆕 New Eden Bench copies: ${newAdCopies.length}`);
    
    // Verify the ad copies were created
    const savedCopies = JSON.parse(localStorage.getItem('facebookAdCopies') || '[]');
    const edenBenchCopies = savedCopies.filter(ad => ad.id.includes('keter-eden-bench'));
    
    console.log('\n🎯 Eden Bench Ad Copies Created:');
    edenBenchCopies.forEach(ad => {
      console.log(`  ${ad.originalLanguage.toUpperCase()}: ${ad.headline}`);
    });
    
    // Price verification
    const priceCheck = {
      gb: edenBenchCopies.find(ad => ad.originalLanguage === 'gb')?.headline.includes('£96.99'),
      dk: edenBenchCopies.find(ad => ad.originalLanguage === 'dk')?.headline.includes('1250 kr'),
      no: edenBenchCopies.find(ad => ad.originalLanguage === 'no')?.headline.includes('1350 kr'),
      es: edenBenchCopies.find(ad => ad.originalLanguage === 'es')?.headline.includes('€115'),
      ch: edenBenchCopies.find(ad => ad.originalLanguage === 'ch')?.headline.includes('125')
    };
    
    console.log('\n💰 Price Verification:');
    Object.entries(priceCheck).forEach(([country, correct]) => {
      console.log(`  ${country.toUpperCase()}: ${correct ? '✅' : '❌'}`);
    });
    
    console.log('\n🎉 All done! Refresh the Facebook Ads page to see the new ad copies.');
    
  } catch (error) {
    console.error('❌ Error generating ad copies:', error);
  }
})();
