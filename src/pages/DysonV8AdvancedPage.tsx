import React from 'react';
import ProductPage3 from '../components/ProductPage3';

const DysonV8AdvancedPage = () => {
  const productImages = [
    'https://m.media-amazon.com/images/I/51qsTzVMiXL._AC_SL1200_.jpg',
    'https://m.media-amazon.com/images/I/61HbJlSztkL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/7162X0+2AbL._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/61hd0O17S7L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71gS9acvE7L._AC_SL1500_.jpg',
    'https://m.media-amazon.com/images/I/71XnRVdG7UL._AC_SL1500_.jpg'
  ];

  const productFeatures = [
    'Dyson\'s most powerful V8 ever. Now with 10% more suction.¹',
    'Powerful. Versatile. Quiet. For lightweight and quick cordless cleaning.',
    'Dyson digital motor V8 spins at up to 110,000rpm to generate 130 Air Watts of powerful suction.²',
    'Up to 40 minutes of fade-free power³ with Dyson\'s six-cell, energy-dense, lithium-ion battery.',
    'Two power modes. Powerful Eco mode for everyday cleaning tasks – the optimal balance of power and run time which preserves the lifespan of your battery. Or MAX mode for powerful, intensive spot cleaning.',
    'Converts to handheld: Transforms to a handheld vacuum for cleaning cars, stairs, and upholstery.',
    'Whole-machine filtration: Advanced whole-machine filtration captures particles as small as 0.3 microns.',
    'Point and shoot hygienic dirt ejector: Drives out trapped dust and debris in one action.',
    'Drop-in docking: Wall-mounted dock charges the machine and tidily stores the tools.',
    'Quick-release tools: Easy tool swapping for versatile cleaning around the home.'
  ];

  const productDetails = {
    'Brand': 'Dyson',
    'Model Number': 'SV25',
    'Colour': 'Silver / Nickel',
    'Product dimensions': '22.1 x 25 x 125.6 cm',
    'Capacity': '0.54 litres',
    'Power / Wattage': '425 watts',
    'Number of Speeds': '2',
    'Noise Level': '82 dB',
    'Runtime': '40 minutes',
    'Special Features': 'Bagless, Cordless, Lightweight, Rechargeable, Washable Filter',
    'Item Weight': '2.5 kg',
    'Filter Type': 'HEPA Filter',
    'Voltage': '120 Volts',
    'Surface Recommendation': 'All floors'
  };

  return (
    <ProductPage3
      productId="dyson-v8-advanced"
      productName="Dyson V8™ Advanced cordless stick vacuum cleaner (Silver/Nickel)"
      productBrand="Dyson"
      productRating={4.5}
      productRatingsCount={3612}
      productBoughtInMonth="1K+"
      productPrice={{
        gb: '£9.99',
        dk: '63.85 kr',
        no: '99 kr',
        es: '€32.50',
        ch: 'CHF 35.00',
        za: 'R199.99',
        default: '£9.99'
      }}
      productOriginalPrice={{
        gb: '£329.99',
        dk: '2110.93 kr',
        no: '3267 kr',
        es: '€329.99',
        ch: 'CHF 329.99',
        za: 'R6599.99',
        default: '£329.99'
      }}
      productDiscount="38%"
      productImages={productImages}
      productBreadcrumb={['Home', 'Home & Kitchen', 'Stick Vacuums & Electric Brooms', 'Dyson']}
      productFeatures={productFeatures}
      productAboutThisItem={productFeatures}
      productDetails={productDetails}
      productTechnicalDetails={{
        'Brand': 'Dyson',
        'Model Number': 'SV25',
        'Colour': 'Silver / Nickel',
        'Product Dimensions': '22.1 x 25 x 125.6 cm; 2.5 kg',
        'Capacity': '0.54 litres',
        'Power / Wattage': '425 watts',
        'Number of Speeds': '2',
        'Noise Level': '82 dB',
        'Runtime': '40 minutes',
        'Special Features': 'Bagless, Cordless, Lightweight, Rechargeable, Washable Filter',
        'Item Weight': '2.5 kg',
        'ASIN': 'B0DCGLPW84',
        'Customer Reviews': '4.5 out of 5 stars 3,612 ratings',
        'Best Sellers Rank': '#244 in Home & Kitchen, #2 in Stick Vacuums & Electric Brooms',
        'Date First Available': '5 Mar. 2025'
      }}
      productReviews={[
        {
          id: '1',
          author: 'Apostolos',
          rating: 5,
          title: 'Amazing Dyson',
          content: 'I\'m really impressed with the Dyson V8! It\'s super lightweight, powerful, and makes cleaning so much easier than I expected. I love that it converts to a handheld – perfect for the sofa and the car. The battery lasts around 35–40 minutes, and it does a great job picking up even pet hair. Honestly, it was worth every penny!',
          date: '11 May 2025',
          verified: true,
          helpful: 13,
          images: ['https://m.media-amazon.com/images/I/61J5thsWnWL.jpg']
        },
        {
          id: '2',
          author: 'jc',
          rating: 5,
          title: 'So light!',
          content: 'It does feel like a toy, not gonna lie, but it is so light that you really can\'t say anything bad about it. Vacuums perfectly fine, has a couple of different accessories. Very easy to empty. As someone who only had wired vacuums before, it really changed the game for me. Runs for about 40 minutes. My favourite new toy.',
          date: '8 August 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/51KIvEsVU2L.jpg']
        },
        {
          id: '3',
          author: 'martin lofthouse',
          rating: 5,
          title: 'Another great Dyson',
          content: 'I\'ve had this Dyson for a couple of weeks now and find it very easy to use. It is lightweight and easy to move around the house certainly value for money battery life is adequate for our house',
          date: '23 July 2025',
          verified: true,
          helpful: 2,
          images: ['https://m.media-amazon.com/images/I/51+j9dguZSL.jpg']
        },
        {
          id: '4',
          author: 'Jim Ray',
          rating: 4,
          title: 'Very good product',
          content: 'It is very light and easy to use. Good suction and value for money.',
          date: '16 July 2025',
          verified: true,
          helpful: 1,
          images: ['https://m.media-amazon.com/images/I/71cNv3wccwL.jpg']
        },
        {
          id: '5',
          author: 'Media Scribe',
          rating: 5,
          title: 'Lightweight and effective.',
          content: 'The V8 cleans well and is simple to use and maintain. The docking system allows both charging and storing.',
          date: '27 July 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/715Ex65QR6L.jpg']
        }
      ]}
      productColorOptions={[
        { name: 'Silver/Nickel', available: true }
      ]}
      productSizeOptions={[
        { name: 'V8 Advanced', available: true }
      ]}
      productVariants={[
        {
          id: 'style-variant',
          type: 'Style',
          name: 'V8 Advanced',
          options: [
            {
              name: 'V8 Advanced',
              images: productImages
            }
          ]
        }
      ]}
      productStockCount={50}
      productQuantityLimit={5}
      productSafetyFeatures={[
        'HEPA filtration system',
        'Cordless safety design',
        'Lightweight construction',
        'Easy-empty hygienic dirt ejector'
      ]}
      productInfo={{
        'Brand': 'Dyson',
        'Model': 'SV25',
        'Type': 'Cordless Stick Vacuum',
        'Power': '425 watts',
        'Runtime': '40 minutes',
        'Capacity': '0.54 litres',
        'Weight': '2.5 kg'
      }}
      productCategory="Home & Kitchen"
      productMaterial="High-grade ABS plastic"
      productCapacity="0.54 litres"
      productWarranty="2 year warranty"
      productPartNumber="SV25"
      productModelNumber="SV25"
      productASIN="B0DCGLPW84"
      productDateFirstAvailable="5 Mar. 2025"
      productDimensions="22.1 x 25 x 125.6 cm"
      productWeight="2.5 kg"
      productVolume="0.54L"
    />
  );
};

export default DysonV8AdvancedPage;
