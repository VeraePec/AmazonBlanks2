interface ProductData {
  name: string;
  description?: string;
  aboutThisItem?: string[];
  features?: string[];
  category?: string;
  price?: string;
  originalPrice?: string;
}

interface AdCopyResult {
  headline: string;
  copy: string;
}

const adCopyPrompt = `I will be providing you Amazon product page texts, and based on that text, I want you to create me a short strong Headline (For Meta ads) and an ad copy. The ad copy should be like a regular Facebook post of someone buying a product from Amazon that was on a clearance sale, and they snatched a deal for the price specified in the product data. It should be realistic, conversational, and persuasive (for other people seeing that post to also go on the Amazon link and to buy it). Use the exact price from the product data provided.

The ad copy should be more personal, conversational, and detailed - like someone genuinely sharing their experience. Think honest review mixed with excitement about finding a great deal.

Return the response in this exact JSON format:
{
  "headline": "Your headline here",
  "copy": "Your ad copy here"
}

Example headlines (replace PRICE with actual product price):
- "Found this Amazon gem for PRICE"
- "Clearance find that actually delivered"
- "Amazon deal I couldn't pass up"
- "PRICE well spent"

Example ad copy style (replace PRICE with actual product price):
"I needed extra storage but didn't want to spend thousands… Saw this on clearance and figured, why not? It arrived in two days, and I was actually impressed — clean design, feels solid, and the drawers are way deeper than I expected.

Took me about an hour to put together, and it looks proper in the bedroom. White finish is smooth, not cheap-looking, and the drawers glide well. If you're tired of clothes everywhere and just need a solid storage fix, this works.

Only downside? I wish I ordered two.
Order now before it sells out again — at PRICE it's honestly a steal."

Make it conversational, honest, detailed, and include specific benefits they experienced. Always end with urgency about the actual product price and ordering before it sells out. Use the exact price from the product data.

Now generate for this product:`;

export async function generateAdCopy(productData: ProductData): Promise<AdCopyResult> {
  try {
    // Prepare product description
    const productDescription = [
      `Product: ${productData.name}`,
      productData.description ? `Description: ${productData.description}` : '',
      productData.aboutThisItem?.length ? `Features: ${productData.aboutThisItem.join(', ')}` : '',
      productData.features?.length ? `Additional Features: ${productData.features.join(', ')}` : '',
      productData.category ? `Category: ${productData.category}` : '',
      productData.price ? `Current Price: ${productData.price}` : '',
      productData.originalPrice ? `Original Price: ${productData.originalPrice}` : ''
    ].filter(Boolean).join('\n');

    const fullPrompt = `${adCopyPrompt}\n\n${productDescription}`;

    // Check if we have OpenAI API key
    const openaiApiKey = localStorage.getItem('openai_api_key');
    if (!openaiApiKey) {
      console.warn('OpenAI API key not found, using fallback ad copy generation');
      return generateFallbackAdCopy(productData);
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert Facebook ad copywriter who creates compelling, realistic social media posts that drive sales. Always respond with valid JSON format.'
          },
          {
            role: 'user',
            content: fullPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse JSON response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.headline && parsed.copy) {
        return {
          headline: parsed.headline,
          copy: parsed.copy
        };
      }
    }

    throw new Error('Invalid AI response format');

  } catch (error) {
    console.warn('AI ad copy generation failed, using fallback:', error);
    return generateFallbackAdCopy(productData);
  }
}

function generateFallbackAdCopy(productData: ProductData): AdCopyResult {
  // Use the actual product prices from productData
  const price = productData.price || '£9.99';
  const originalPrice = productData.originalPrice || '£14.99';
  
  const headlines = [
    `Found this Amazon gem for ${price}`,
    "Clearance find that actually delivered",
    "Amazon deal I couldn't pass up",
    `${price} well spent`,
    "Honestly didn't expect this quality"
  ];

  const copyTemplates = [
    `I needed something like this but didn't want to spend a fortune… Saw this ${productData.name} on clearance and figured, why not? It arrived in two days, and I was actually impressed — great quality, feels solid, and works exactly as described.

Setup was straightforward, took about an hour, and it looks proper. The build quality is better than expected for the price, not cheap-looking at all. If you're looking for something functional and well-made, this definitely works.

Only downside? I wish I ordered another one.
Order now before it sells out again — at ${price} it's honestly a steal.`,
    
    `Wasn't planning to buy anything, but saw this ${productData.name} for ${price} and couldn't resist… Best impulse buy I've made in ages! Quality is surprisingly good, and it's exactly what I needed.

Arrived quickly, easy to set up, and it's been working perfectly. The design is clean and modern, not cheap-looking like some budget items. Really happy with this purchase.

At this price, you can't go wrong. 
Grab it while it's still available — ${price} for this quality is mad.`,
    
    `Been looking for a ${productData.name} for months but didn't want to spend loads… Found this on Amazon's clearance section for just ${price} and thought it was too good to be true. Turns out, it's actually brilliant!

Quality exceeded my expectations completely. Well-made, sturdy, and looks way more expensive than it was. Assembly was simple, and it fits perfectly in my space.

Seriously considering ordering another one before the price goes back up.
If you need one of these, don't wait — ${price} won't last long.`,
    
    `Honestly didn't expect much for ${price}, but this ${productData.name} has proper surprised me… Quality is excellent, arrived quickly, and it's exactly what I was looking for.

Setup took no time at all, instructions were clear, and it looks great. The materials feel solid, not flimsy like some cheap alternatives. Been using it for weeks now and no issues whatsoever.

Best ${price} I've spent in ages.
Get yours before they realize they're selling it too cheap — this won't stay at ${price} forever.`,
    
    `Saw this ${productData.name} in Amazon's clearance section for ${price} and almost scrolled past… So glad I didn't! This thing is actually quality — well-built, looks good, and does exactly what it should.

Delivery was fast, packaging was decent, and assembly was straightforward. It's been brilliant so far, no complaints at all. The price feels like a mistake on Amazon's part.

Definitely recommend grabbing one while they're still this cheap.
At ${price}, it's basically free money — order before stock runs out.`
  ];

  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
  const randomCopy = copyTemplates[Math.floor(Math.random() * copyTemplates.length)];

  return {
    headline: randomHeadline,
    copy: randomCopy
  };
}

export async function saveAdCopy(productId: string, productName: string, headline: string, copy: string): Promise<void> {
  try {
    const existingAdCopies = localStorage.getItem('facebookAdCopies');
    const adCopies = existingAdCopies ? JSON.parse(existingAdCopies) : [];
    
    // Try to get additional product data
    let productImage = '/placeholder.svg';
    let productUrl = `${window.location.origin}/${productId}`;
    let simplifiedName = productName;
    
    try {
      const { getDynamicProduct } = await import('./dynamicProductRegistry');
      const productData = getDynamicProduct(productId);
      
      if (productData) {
        productImage = productData.images?.[0] || '/placeholder.svg';
        productUrl = `${window.location.origin}${productData.route}`;
        
        // Simplify product name
        simplifiedName = productName
          .replace(/Amazon\s+Basics\s+/gi, '')
          .replace(/\b(Storage|Organizer|Cabinet|Chest|Box|Unit|Set|Pack)\b/gi, '')
          .replace(/\b\d+[L|l|cm|kg|W|inch|ft]\b/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .split(' ')
          .slice(0, 3)
          .join(' ');
      }
    } catch (error) {
      console.warn('Could not load additional product data:', error);
    }
    
    const newAdCopy = {
      id: productId,
      productName,
      headline,
      copy,
      createdAt: new Date().toISOString(),
      originalLanguage: 'en',
      productImage,
      productUrl,
      simplifiedName
    };
    
    // Remove existing ad copy for this product if it exists
    const filteredAdCopies = adCopies.filter((ad: any) => ad.id !== productId);
    filteredAdCopies.push(newAdCopy);
    
    localStorage.setItem('facebookAdCopies', JSON.stringify(filteredAdCopies));
    console.log('✅ Ad copy saved for product:', productName);
  } catch (error) {
    console.error('❌ Error saving ad copy:', error);
  }
}

// Function to save ad copy with a specific route
export async function saveAdCopyWithRoute(productId: string, productName: string, headline: string, copy: string, productRoute: string, productImages?: string[]): Promise<void> {
  try {
    const existingAdCopies = localStorage.getItem('facebookAdCopies');
    const adCopies = existingAdCopies ? JSON.parse(existingAdCopies) : [];
    
    // Try to get additional product data
    let productImage = '/placeholder.svg';
    let productUrl = `${window.location.origin}${productRoute}`;
    let simplifiedName = productName;
    
    // Use provided product images if available, otherwise try to get from dynamic registry
    if (productImages && productImages.length > 0) {
      productImage = productImages[0];
    } else {
      try {
        const { getDynamicProduct } = await import('./dynamicProductRegistry');
        const productData = getDynamicProduct(productId);
        
        if (productData) {
          productImage = productData.images?.[0] || '/placeholder.svg';
        }
      } catch (error) {
        console.warn('Could not load additional product data:', error);
      }
    }
    
    // Simplify product name
    simplifiedName = productName
      .replace(/Amazon\s+Basics\s+/gi, '')
      .replace(/\b(Storage|Organizer|Cabinet|Chest|Box|Unit|Set|Pack)\b/gi, '')
      .replace(/\b\d+[L|l|cm|kg|W|inch|ft]\b/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .slice(0, 3)
      .join(' ');
    
    const newAdCopy = {
      id: productId,
      productName,
      headline,
      copy,
      createdAt: new Date().toISOString(),
      originalLanguage: 'en',
      productImage,
      productUrl,
      simplifiedName
    };
    
    // Remove existing ad copy for this product if it exists
    const filteredAdCopies = adCopies.filter((ad: any) => ad.id !== productId);
    filteredAdCopies.push(newAdCopy);
    
    localStorage.setItem('facebookAdCopies', JSON.stringify(filteredAdCopies));
    console.log('✅ Ad copy saved for product:', productName, 'with route:', productRoute, 'and image:', productImage);
  } catch (error) {
    console.error('❌ Error saving ad copy with route:', error);
  }
}

// New function to automatically generate and save ad copies for ProductPageTemplate products
export async function generateAndSaveAdCopyForProduct(productData: any, productId: string): Promise<void> {
  try {
    console.log('🔄 Generating ad copy for ProductPageTemplate product:', productData.name);
    
    // Generate ad copy using the existing function
    const adCopy = await generateAdCopy({
      name: productData.name,
      description: productData.aboutThisItem?.join(' ') || '',
      aboutThisItem: productData.aboutThisItem || [],
      features: productData.features || [],
      category: productData.breadcrumb?.[productData.breadcrumb.length - 1] || 'Product',
      price: productData.price || '£9.99',
      originalPrice: productData.originalPrice || '£14.99'
    });
    
    // Determine the correct product route based on productId
    let productRoute = `/${productId}`;
    
    // Check if this is a known static route
    if (productId === 'keter-storage-shed') {
      productRoute = '/keter-storage-shed';
    }
    // Add more static route mappings here as needed
    
    // Save the generated ad copy with the correct route and images
    await saveAdCopyWithRoute(productId, productData.name, adCopy.headline, adCopy.copy, productRoute, productData.images);
    
    console.log('✅ Ad copy generated and saved for ProductPageTemplate product:', productData.name);
  } catch (error) {
    console.error('❌ Error generating ad copy for ProductPageTemplate product:', error);
  }
}

// Function to generate country-specific ad copies for ProductPageTemplate products
export async function generateCountrySpecificAdCopies(productData: any, productId: string): Promise<void> {
  try {
    console.log('🔄 Generating country-specific ad copies for ProductPageTemplate product:', productData.name);
    
    // Define country configurations with proper pricing
    const countryConfigs = {
      gb: { price: '£9.99', originalPrice: '£14.99', currency: 'GBP' },
      dk: { price: '63.58 kr', originalPrice: '95.37 kr', currency: 'DKK' },
      no: { price: '99 kr', originalPrice: '148.50 kr', currency: 'NOK' },
      es: { price: '€11.50', originalPrice: '€17.25', currency: 'EUR' },
      ch: { price: 'CHF 10.50', originalPrice: 'CHF 15.75', currency: 'CHF' }
    };
    
    // Generate ad copy for each country
    for (const [countryCode, config] of Object.entries(countryConfigs)) {
      // Create country-specific product data
      const countryProductData = {
        ...productData,
        price: config.price,
        originalPrice: config.originalPrice
      };
      
      const countrySpecificAdCopy = await generateCountrySpecificAdCopy(countryProductData, countryCode, config);
      
      // Save the country-specific ad copy
      await saveAdCopyWithRoute(
        `${productId}-${countryCode}`, 
        productData.name, 
        countrySpecificAdCopy.headline, 
        countrySpecificAdCopy.copy, 
        `/${productId}`, 
        productData.images
      );
    }
    
    console.log('✅ Country-specific ad copies generated and saved for ProductPageTemplate product:', productData.name);
  } catch (error) {
    console.error('❌ Error generating country-specific ad copies for ProductPageTemplate product:', error);
  }
}

// Function to generate ad copy for a specific country
async function generateCountrySpecificAdCopy(productData: any, countryCode: string, config: any): Promise<AdCopyResult> {
  // Country-specific ad copy templates
  const countryTemplates = {
    gb: {
      headlines: [
        "Found this Amazon gem for £9.99",
        "Clearance find that actually delivered",
        "Amazon deal I couldn't pass up",
        "£9.99 well spent",
        "Honestly didn't expect this quality"
      ],
      copyTemplates: [
        `I needed something like this but didn't want to spend a fortune… Saw this ${productData.name} on clearance and figured, why not? It arrived in two days, and I was actually impressed — great quality, feels solid, and works exactly as described.

Setup was straightforward, took about an hour, and it looks proper. The build quality is better than expected for the price, not cheap-looking at all. If you're looking for something functional and well-made, this definitely works.

Only downside? I wish I ordered another one.
Order now before it sells out again — at £9.99 it's honestly a steal.`
      ]
    },
    dk: {
      headlines: [
        "Fantastisk Amazon fund for 63.58 kr",
        "Udsalgs fund der faktisk leverede",
        "Amazon tilbud jeg ikke kunne sige nej til",
        "63.58 kr godt brugt",
        "Ærligt talt forventede jeg ikke denne kvalitet"
      ],
      copyTemplates: [
        `Jeg havde brug for noget som dette, men ville ikke bruge en formue… Så denne ${productData.name} på udsalg og tænkte, hvorfor ikke? Den ankom på to dage, og jeg var faktisk imponeret — god kvalitet, føles solid og fungerer præcis som beskrevet.

Opsætning var ligetil, tog omkring en time, og det ser ordentligt ud. Kvaliteten er bedre end forventet til prisen, slet ikke billigt udseende. Hvis du leder efter noget funktionelt og velgjort, virker dette helt sikkert.

Eneste ulempe? Jeg ønsker jeg havde bestilt en til.
Bestil nu før den bliver udsolgt igen — til 63.58 kr er det ærligt talt et røverkøb.`
      ]
    },
    no: {
      headlines: [
        "Fantastisk Amazon funn for 99 kr",
        "Utsalgsfunn som faktisk leverte",
        "Amazon tilbud jeg ikke kunne si nei til",
        "99 kr godt brukt",
        "Ærlig talt forventet jeg ikke denne kvaliteten"
      ],
      copyTemplates: [
        `Jeg trengte noe som dette, men ville ikke bruke en formue… Så denne ${productData.name} på utsalg og tenkte, hvorfor ikke? Den ankom på to dager, og jeg var faktisk imponert — god kvalitet, føles solid og fungerer akkurat som beskrevet.

Oppsett var greit, tok omkring en time, og det ser ordentlig ut. Kvaliteten er bedre enn forventet til prisen, slett ikke billig utseende. Hvis du leter etter noe funksjonelt og velgjort, fungerer dette helt sikkert.

Eneste ulempe? Jeg ønsker jeg hadde bestilt en til.
Bestill nå før den blir utsolgt igjen — til 99 kr er det ærlig talt et røverkjøp.`
      ]
    },
    es: {
      headlines: [
        "¡Encontré esta joya de Amazon por €11.50",
        "Hallazgo de liquidación que realmente cumplió",
        "Oferta de Amazon que no pude rechazar",
        "€11.50 bien gastados",
        "Honestamente no esperaba esta calidad"
      ],
      copyTemplates: [
        `Necesitaba algo como esto pero no quería gastar una fortuna… Vi esto ${productData.name} en liquidación y pensé, ¿por qué no? Llegó en dos días, y honestamente me impresionó — gran calidad, se siente sólido y funciona exactamente como se describe.

La configuración fue sencilla, tomó aproximadamente una hora, y se ve apropiado. La calidad de construcción es mejor de lo esperado por el precio, no se ve barato en absoluto. Si buscas algo funcional y bien hecho, esto definitivamente funciona.

¿La única desventaja? Desearía haber pedido otro.
Pídelo ahora antes de que se agote nuevamente — a €11.50 es honestamente una ganga.`
      ]
    },
    ch: {
      headlines: [
        "Unglaubliches Amazon Fund für CHF 10.50",
        "Ausverkaufs-Fund der tatsächlich geliefert hat",
        "Amazon Angebot das ich nicht ablehnen konnte",
        "CHF 10.50 gut investiert",
        "Ehrlich gesagt habe ich diese Qualität nicht erwartet"
      ],
      copyTemplates: [
        `Ich brauchte so etwas, aber wollte kein Vermögen ausgeben… Sah diesen ${productData.name} im Ausverkauf und dachte, warum nicht? Er kam in zwei Tagen an und ich war ehrlich gesagt beeindruckt — tolle Qualität, fühlt sich solide an und funktioniert genau wie beschrieben.

Der Aufbau war unkompliziert, dauerte etwa eine Stunde und sieht ordentlich aus. Die Verarbeitungsqualität ist besser als erwartet für den Preis, sieht überhaupt nicht billig aus. Wenn Sie nach etwas Funktionalem und gut Gemachtem suchen, funktioniert das definitiv.

Der einzige Nachteil? Ich wünschte, ich hätte einen zweiten bestellt.
Bestellen Sie jetzt, bevor er wieder ausverkauft ist — für CHF 10.50 ist es ehrlich gesagt ein Schnäppchen.`
      ]
    }
  };
  
  const template = countryTemplates[countryCode as keyof typeof countryTemplates];
  if (!template) {
    // Fallback to UK template
    const fallbackTemplate = countryTemplates.gb;
    const randomHeadline = fallbackTemplate.headlines[Math.floor(Math.random() * fallbackTemplate.headlines.length)];
    const randomCopy = fallbackTemplate.copyTemplates[Math.floor(Math.random() * fallbackTemplate.copyTemplates.length)];
    
    return {
      headline: randomHeadline,
      copy: randomCopy
    };
  }
  
  const randomHeadline = template.headlines[Math.floor(Math.random() * template.headlines.length)];
  const randomCopy = template.copyTemplates[Math.floor(Math.random() * template.copyTemplates.length)];
  
  return {
    headline: randomHeadline,
    copy: randomCopy
  };
}

// Function to generate ad copies for all existing ProductPageTemplate products
export async function generateAdCopiesForAllProductPageTemplateProducts(): Promise<void> {
  try {
    console.log('🔄 Generating ad copies for all ProductPageTemplate products...');
    
    // Get all products from the dynamic registry
    const { getAllDynamicProducts } = await import('./dynamicProductRegistry');
    const allProducts = getAllDynamicProducts();
    
    // Filter for products that likely use ProductPageTemplate (have specific structure)
    const productPageTemplateProducts = allProducts.filter(product => 
      product.aboutThisItem && 
      Array.isArray(product.aboutThisItem) && 
      product.aboutThisItem.length > 0 &&
      product.features && 
      Array.isArray(product.features) && 
      product.features.length > 0
    );
    
    console.log(`Found ${productPageTemplateProducts.length} ProductPageTemplate products to generate ad copies for`);
    
    // Generate ad copies for each product
    for (const product of productPageTemplateProducts) {
      await generateAndSaveAdCopyForProduct(product, product.id || product.name);
    }
    
    console.log('✅ Finished generating ad copies for all ProductPageTemplate products');
  } catch (error) {
    console.error('❌ Error generating ad copies for all ProductPageTemplate products:', error);
  }
}

// Function to generate ad copy for a specific product by name
export async function generateAdCopyForProductByName(productName: string): Promise<void> {
  try {
    console.log(`🔄 Generating ad copy for specific product: ${productName}`);
    
    // Get all products from the dynamic registry
    const { getAllDynamicProducts } = await import('./dynamicProductRegistry');
    const allProducts = getAllDynamicProducts();
    
    // Find the specific product by name
    const product = allProducts.find(p => 
      p.name.toLowerCase().includes(productName.toLowerCase()) ||
      productName.toLowerCase().includes(p.name.toLowerCase())
    );
    
    if (product) {
      console.log(`✅ Found product: ${product.name}`);
      await generateAndSaveAdCopyForProduct(product, product.id || product.name);
    } else {
      console.warn(`❌ Product not found: ${productName}`);
      console.log('Available products:', allProducts.map(p => p.name));
    }
  } catch (error) {
    console.error('❌ Error generating ad copy for specific product:', error);
  }
}
