import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const KeterBevyBarPage: React.FC = () => {
  return (
    <ProductPage2
      // Basic Information
      productId="keter-bevy-bar"
      productName="Keter Bevy BAR Cocktail Table, Polypropylene, Anthracite Grey | 60L Capacity | UV Treated | Insulated | Maintenance-Free | 2 Year Warranty"
      productBrand="Keter"
      productRating={4.6}
      productRatingsCount={350}
      productBoughtInMonth="50K+"

      // Pricing - ALWAYS £9.99 default structure
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
        gb: '£45.00',
        dk: '450 kr',
        no: '495 kr',
        es: '€45.00',
        ch: 'CHF 48.00',
        za: 'R900',
        default: '£45.00'
      }}
      productDiscount="78%"

      // Product Images
      productImages={[
        'https://m.media-amazon.com/images/I/71dOnhCcf5L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81vlpVnGJEL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/616ew+B8jSL._AC_SL1363_.jpg',
        'https://m.media-amazon.com/images/I/81nd1eo34pL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/8165LTt0-0L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/818zGVV0U6L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71UPF4Bt-sL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81xPXIHHijL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81U7oZTgUxL._AC_SL1500_.jpg'
      ]}

      // Breadcrumb
      productBreadcrumb={['Home', 'Garden & Outdoors', 'Garden Furniture', 'Outdoor Tables', 'Cocktail Tables']}

      // Features
      productFeatures={[
        '60 litre capacity',
        'UV treated',
        'Insulated',
        'Maintenance-free',
        'Double wall cooler',
        'Stores up to 65 bottles or 130 cans',
        'Lockable lid',
        'Three-in-one furniture design',
        'Made from recycled plastic',
        'Easy to clean and maintain'
      ]}

      // About This Item
      productAboutThisItem={[
        'The Bevy Bar is the perfect party accessory as it combines a beverage cooler and cocktail table.',
        'Equipped with a double wall cooler that keeps contents cold, it can store up to 65 bottles or 130 cans.',
        'Lock the lid securely when open and use it as a side table to serve food and drinks.',
        'Open size: 83.5cm (L) x 75cm (W) x 40.5cm (H) Closed size: 83.5cm (L) x 52cm (W) x 5cm (H)',
        'Made from recycled plastic, the Bevy Bar requires little maintenance.',
        'Three-in-one furniture: combine a drink cooler, a cocktail table or a coffee table.',
        'The Bevy Bar can be used open or closed.'
      ]}

      // Product Details
      productDetails={{
        color: 'Anthracite Grey',
        material: 'Polypropylene (PP)',
        dimensions: '15.9D x 32.9W x 20.5H centimetres',
        weight: '10.5 Kilograms',
        capacity: '60 litres',
        maxWeight: '21 Kilograms',
        assembly: 'Yes',
        care: 'Wipe with Damp Cloth, Wipe with Dry Cloth'
      }}

      // Technical Details
      productTechnicalDetails={{
        manufacturer: 'KETER',
        partNumber: 'CV3C9',
        modelNumber: '255827',
        asin: 'B08PM739D5',
        dateFirstAvailable: '3 Dec. 2020',
        dimensions: '15.94 x 32.87 x 20.47 cm',
        weight: '10.5 kg',
        material: '100% POLYPROPYLENE',
        style: 'Flat Rattan Faux',
        finish: 'Shiny',
        pieces: '1',
        shippingWeight: '12.62 Kilograms'
      }}

      // Customer Reviews
      productReviews={[
        {
          id: 'review-1',
          author: 'E. Maiden',
          rating: 5,
          title: 'Excellent size for what I needed',
          content: 'Perfect size and shape. Very sturdy and easy to use/ move around in the garden to where I want/need it 👍',
          date: '15 July 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/81deCN1BdcL.jpg']
        },
        {
          id: 'review-2',
          author: 'Jay1999',
          rating: 5,
          title: 'Great cool box',
          content: 'Great cool box which turns into a decent height table which you can use to put drinks on. We get loads of compliments about it and asked where it\'s from. Great price and easy to put together with easy to clean with a wipe. Only this to note is that you shouldn\'t sit on it as it cannot hold a persons weight. It is light weight and easy to move.',
          date: '29 June 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/81lQL0sCsaL.jpg']
        },
        {
          id: 'review-3',
          author: 'Nat93',
          rating: 5,
          title: 'Worth the price',
          content: 'Great for hosting, I left the box outside for guests to take their drinks and their drinks remained cold. Great product.',
          date: '4 August 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/71eUEDWBMyL.jpg']
        },
        {
          id: 'review-4',
          author: 'Hudster',
          rating: 5,
          title: 'Nice looking multifunctional table',
          content: 'Really well made, solid outdoors table. The table top lifts up to show the ice bucket below that means it is multifunctional. It looks really beautiful on a patio. Easy to clean. I have left mine out over winter with no problems at all.',
          date: '8 May 2025',
          verified: true,
          helpful: 0,
          images: []
        },
        {
          id: 'review-5',
          author: 'ka',
          rating: 4,
          title: 'Statement piece',
          content: 'Great addition to the summer BBQs. Very easy to assemble and adjust. We have been putting in 2 bags of ice with space for about 25-30 cans. It is so much more convenient then taking up fridge space and going back and forth to top up guests. Also acts as another table for the garden which is useful. Everyone has complimented us on what a smart little table it is. Would have been 5 stars however the handle to the plug came off after the second use. Not a major issue as it is very easy to push the plug from the bottom to drain.',
          date: '25 July 2023',
          verified: true,
          helpful: 5,
          images: []
        }
      ]}

      // Color Options
      productColorOptions={[
        { name: 'Anthracite Grey', available: true }
      ]}

      // Size Options
      productSizeOptions={[
        { name: 'Standard', available: true }
      ]}

      // Variants
      productVariants={[
        {
          id: 'style-flat-rattan',
          type: 'style',
          name: 'Style',
          options: [
            { name: 'Flat Rattan Faux', images: ['https://m.media-amazon.com/images/I/71dOnhCcf5L._AC_SL1500_.jpg'] }
          ]
        }
      ]}

      // Stock and Quantity
      productStockCount={15}
      productQuantityLimit={5}

      // Safety Features
      productSafetyFeatures={[
        'UV treated',
        'Insulated',
        'Maintenance-free',
        'Lockable design',
        'Weather resistant',
        'Child-safe construction'
      ]}

      // Product Info
      productInfo={{
        category: 'Outdoor Cocktail Tables',
        brand: 'Keter',
        material: 'Polypropylene (PP)',
        capacity: '60 litres',
        warranty: '2 Years Manufacturer',
        recycledContent: 'Made from recycled plastic'
      }}

      // Additional Product Details
      productCategory="Outdoor Cocktail Tables"
      productMaterial="Polypropylene (PP)"
      productCapacity="60 litres"
      productWarranty="2 Years Manufacturer"
      productRecycledContent="Made from recycled plastic"
      productPartNumber="CV3C9"
      productModelNumber="255827"
      productASIN="B08PM739D5"
      productDateFirstAvailable="3 Dec. 2020"
      productDimensions="15.9D x 32.9W x 20.5H centimetres"
      productWeight="10.5 Kilograms"
      productVolume="60 litres"
      productStyle="Flat Rattan Faux"
      productPattern="Single"
      productShape="Rectangular"
      productBatteriesRequired="No"
      productPackageQuantity="1"
    />
  );
};

export default KeterBevyBarPage;
