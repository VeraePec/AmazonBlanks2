// Script to create the Keter Storage Shed product and generate Facebook ad copy
import { createKeterStorageShed } from './src/utils/createProductFromInfo.ts';
import { generateAdCopy, saveAdCopy } from './src/utils/generateAdCopy.ts';

async function createKeterProduct() {
  try {
    console.log('🚀 Creating Keter Storage Shed product...');
    
    // Create the product
    const result = await createKeterStorageShed();
    
    if (result.success) {
      console.log('✅ Product created successfully!');
      console.log('Product ID:', result.productId);
      console.log('Route:', result.route);
      
      // Generate Facebook ad copy
      console.log('📝 Generating Facebook ad copy...');
      
      const adCopyData = {
        productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
        productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
        productUrl: result.route,
        productImages: [
          'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
          'https://m.media-amazon.com/images/I/910TF1aqBKL._AC_SL1500_.jpg',
          'https://m.media-amazon.com/images/I/91L1fuj4+hL._AC_SL1500_.jpg',
          'https://m.media-amazon.com/images/I/81ByjoSNTZL._AC_SL1500_.jpg',
          'https://m.media-amazon.com/images/I/911s9OrxX-L._AC_SL1500_.jpg',
          'https://m.media-amazon.com/images/I/611Ypdn2IlL._AC_SL1500_.jpg'
        ],
        reviewImages: [
          'https://m.media-amazon.com/images/I/810IFH0goHL.jpg',
          'https://m.media-amazon.com/images/I/81THZPlwE7L.jpg',
          'https://m.media-amazon.com/images/I/714V2x9+LKL.jpg',
          'https://m.media-amazon.com/images/I/71FX507VNHL.jpg',
          'https://m.media-amazon.com/images/I/81zZUOHACSL.jpg'
        ]
      };
      
      // Generate multiple ad copies
      const adCopies = [
        {
          headline: 'Transform Your Garden with Premium Storage',
          copy: 'Organize your outdoor space with the Keter Store it Out Nova Storage Shed. 880L capacity, weatherproof design, and elegant wood effect finish. Perfect for garden tools, BBQ accessories, and more. £125.00 with Prime delivery!'
        },
        {
          headline: '880L Garden Storage Solution - Only £125',
          copy: 'Keep your garden organized and clutter-free! The Keter Storage Shed features lockable doors, built-in shelf support, and UV-resistant construction. Easy assembly in 20-40 minutes. Free Prime delivery available!'
        },
        {
          headline: 'Professional Garden Storage - Keter Quality',
          copy: 'Upgrade your outdoor storage with the Keter Nova Shed. Heavy-duty floor, ventilated design, and secure locking system. Accommodates garden tools, wheelie bins, and outdoor equipment. 4.4★ rating from 7,246+ customers!'
        },
        {
          headline: 'Space-Saving Garden Storage - Smart Design',
          copy: 'Maximize your outdoor space with the Keter Storage Shed. Compact 132 x 71.5 x 113.5 cm design with 880L capacity. Weatherproof resin construction with wood effect finish. Perfect for patios, balconies, and gardens!'
        },
        {
          headline: 'Lockable Garden Shed - Secure & Stylish',
          copy: 'Protect your garden equipment with the Keter Storage Shed. Features dual access (front doors + top lid), built-in ventilation, and heavy-duty construction. Assembly takes just 20-40 minutes. £125.00 with 31% discount!'
        }
      ];
      
      // Save each ad copy
      for (const adCopy of adCopies) {
        const savedAd = await saveAdCopy({
          ...adCopyData,
          ...adCopy,
          originalLanguage: 'en'
        });
        console.log('✅ Ad copy saved:', savedAd.id);
      }
      
      console.log('🎉 All done! Product and Facebook ad copies created successfully.');
      console.log('📱 Visit the Facebook Ads page in your admin dashboard to see the ad copies.');
      console.log('🌐 Product page available at:', result.route);
      
    } else {
      console.error('❌ Failed to create product:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Error creating Keter product:', error);
  }
}

// Run the script
createKeterProduct();
