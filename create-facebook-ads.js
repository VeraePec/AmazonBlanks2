// Script to create Facebook ad copies for the Keter Storage Shed
// Run this in your browser console

function createKeterFacebookAds() {
  const adCopies = [
    {
      id: 'keter-ad-1',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Transform Your Garden with Premium Storage',
      copy: 'Organize your outdoor space with the Keter Store it Out Nova Storage Shed. 880L capacity, weatherproof design, and elegant wood effect finish. Perfect for garden tools, BBQ accessories, and more. £125.00 with Prime delivery!',
      createdAt: new Date().toISOString(),
      originalLanguage: 'en',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: '/keter-storage-shed',
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
      ],
      simplifiedName: 'Keter Storage Shed',
      isLaunched: false
    },
    {
      id: 'keter-ad-2',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: '880L Garden Storage Solution - Only £125',
      copy: 'Keep your garden organized and clutter-free! The Keter Storage Shed features lockable doors, built-in shelf support, and UV-resistant construction. Easy assembly in 20-40 minutes. Free Prime delivery available!',
      createdAt: new Date().toISOString(),
      originalLanguage: 'en',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: '/keter-storage-shed',
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
      ],
      simplifiedName: 'Keter Storage Shed',
      isLaunched: false
    },
    {
      id: 'keter-ad-3',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Professional Garden Storage - Keter Quality',
      copy: 'Upgrade your outdoor storage with the Keter Nova Shed. Heavy-duty floor, ventilated design, and secure locking system. Accommodates garden tools, wheelie bins, and outdoor equipment. 4.4★ rating from 7,246+ customers!',
      createdAt: new Date().toISOString(),
      originalLanguage: 'en',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: '/keter-storage-shed',
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
      ],
      simplifiedName: 'Keter Storage Shed',
      isLaunched: false
    },
    {
      id: 'keter-ad-4',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Space-Saving Garden Storage - Smart Design',
      copy: 'Maximize your outdoor space with the Keter Storage Shed. Compact 132 x 71.5 x 113.5 cm design with 880L capacity. Weatherproof resin construction with wood effect finish. Perfect for patios, balconies, and gardens!',
      createdAt: new Date().toISOString(),
      originalLanguage: 'en',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: '/keter-storage-shed',
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
      ],
      simplifiedName: 'Keter Storage Shed',
      isLaunched: false
    },
    {
      id: 'keter-ad-5',
      productName: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
      headline: 'Lockable Garden Shed - Secure & Stylish',
      copy: 'Protect your garden equipment with the Keter Storage Shed. Features dual access (front doors + top lid), built-in ventilation, and heavy-duty construction. Assembly takes just 20-40 minutes. £125.00 with 31% discount!',
      createdAt: new Date().toISOString(),
      originalLanguage: 'en',
      productImage: 'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      productUrl: '/keter-storage-shed',
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
      ],
      simplifiedName: 'Keter Storage Shed',
      isLaunched: false
    }
  ];

  // Get existing ad copies or create empty array
  const existingAds = JSON.parse(localStorage.getItem('facebookAdCopies') || '[]');
  
  // Add new ad copies
  const allAds = [...existingAds, ...adCopies];
  
  // Save to localStorage
  localStorage.setItem('facebookAdCopies', JSON.stringify(allAds));
  
  console.log('✅ Created 5 Facebook ad copies for Keter Storage Shed');
  console.log('📱 Visit /facebook-ads to see them');
  console.log('🎯 Total ad copies in system:', allAds.length);
  
  return allAds;
}

// Make it available globally
window.createKeterFacebookAds = createKeterFacebookAds;

console.log('✅ Keter Facebook ads script loaded!');
console.log('Run createKeterFacebookAds() in the console to create the ad copies.');
