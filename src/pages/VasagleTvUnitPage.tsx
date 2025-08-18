import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const VasagleTvUnitPage: React.FC = () => {
  return (
    <ProductPage2
      // Basic Information
      productId="vasagle-tv-unit"
      productName="VASAGLE LTV027T46 TV Unit, 140 cm Long with 2 Doors, Adjustable Shelf, for TVs up to 65 inches, Living Room, Dining Room and Bedroom, White"
      productBrand="VASAGLE"
      productRating={4.7}
      productRatingsCount={2943}
      productBoughtInMonth="200+"

      // Pricing - ALWAYS £9.99 default structure
      productPrice={{
        gb: '£9.99',
        dk: '63.85 kr',
        no: '99 kr',
        es: '€32.50',
        ch: 'CHF 35.00',
        default: '£9.99'
      }}
      productOriginalPrice={{
        gb: '£43.89',
        dk: '438.90 kr',
        no: '438.90 kr',
        es: '€43.89',
        ch: 'CHF 47.00',
        default: '£43.89'
      }}
      productDiscount="77%"

      // Product Images
      productImages={[
        'https://m.media-amazon.com/images/I/71rXehvPVCL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/818-EhcUkbL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81ifLpsF2qL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71tz5+5KKNL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61Ebh1vFJuL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61IVMNZxuZL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/612PHzslq9L._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71ioGJcYcAL._AC_SL1500_.jpg'
      ]}

      // Breadcrumb
      productBreadcrumb={['Home', 'Home & Kitchen', 'TV Stands & Multimedia Centres', 'TV Stands']}

      // Features
      productFeatures={[
        '140 cm long TV unit for TVs up to 65 inches',
        '2 doors with adjustable shelves',
        'Open compartments for game consoles and receivers',
        'Closed compartments for DVDs and storage',
        'High-quality water-resistant particleboard panels',
        '12 cm space underneath for robotic vacuuming',
        'Two cable holes for easy cable management',
        'Modern white design for any room',
        'Easy assembly with clear instructions',
        'Maximum static load capacity: 50 kg'
      ]}

      // About This Item
      productAboutThisItem={[
        'LIKE ON TV: The white TV stand adds a touch of unique charm to your room. You will not feel any jealousy seeing the interiors of lofts in Paris and New York in movies and on TV.',
        'Enough Space The TV stand can accommodate TVs up to 65 inches. For small TVs, it is enough to place plants on both sides.',
        'Everything is ready: will your favorite movie be on TV soon? You can place the game consoles and receivers in the 2 open compartments and store the DVDs in the compartments with doors. The movie is in progress and you just have to sit back and enjoy it.',
        'As simple as 1x1: thanks to the clear instructions and the well-identified parts, assembly is done without breaking your head. After work, you still have time to settle down before the screening of your favorite movie at 8:15 p.m.',
        '3, 2, 1, Action: This modern TV stand will be your perfect Sunday night companion. Grab the chips hidden behind the push-opening door and enjoy your movie night with family or friends.'
      ]}

      // Product Details
      productDetails={{
        color: 'White',
        material: 'Particleboard',
        dimensions: '140 x 40 x 50 centimetres',
        weight: '26.2 Kilograms',
        size: '140L',
        brand: 'VASAGLE',
        style: 'Modern',
        assembly: 'Yes',
        shape: 'Rectangular'
      }}

      // Technical Details
      productTechnicalDetails={{
        manufacturer: 'VASAGLE',
        partNumber: 'LTV027T46',
        modelNumber: 'HU-XI-201',
        asin: 'B0BVD2N39H',
        dateFirstAvailable: '10 Feb. 2023',
        dimensions: '140 x 40 x 50 cm',
        weight: '26.2 kg',
        material: 'Particleboard',
        style: 'Modern TV Unit',
        finish: 'White',
        pieces: '1',
        shippingWeight: '26.2 Kilograms',
        maxLoadCapacity: '50 kg',
        shelves: '2 adjustable'
      }}

      // Customer Reviews
      productReviews={[
        {
          id: 'review-1',
          author: 'Anne',
          rating: 5,
          title: 'Easy to assemble, quick delivery, value for money, beautiful furniture',
          content: 'I had the bright idea of buying two of these to make a longer stronger tv unit and I\'m so glad I did. I broke my wrist a week ago but I was still able to put both together in a day, beautifully made and so easy to put together I was so pleased. So much storage too! The units arrived 3 days earlier than stated and although the boxes were a bit beat up the pieces were packed safely. And because I had two I could see care was taken with each unit. The photos don\'t give the pattern in the wood the justice it deserves. I have a sky glass 55" tv weighing 12kg and it fits beautifully on the units. Highly recommend',
          date: '10 August 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/61IJLziNriL.jpg']
        },
        {
          id: 'review-2',
          author: 'Kindle Customer',
          rating: 5,
          title: 'This quality, at this price....buy it!',
          content: 'I needed a tv unit for a large tv in a smaller space, this fitted the bill, holds my 65" perfectly, matches my coffee table perfectly. It\'s very sturdy, it was straightforward building, and would lie if I said I wasn\'t impressed with that screwdriver - nice touch! Everything was well labelled, well packaged and arrived a day earlier. What\'s left to say?',
          date: '19 June 2025',
          verified: true,
          helpful: 2,
          images: ['https://m.media-amazon.com/images/I/711sBRFDDPL.jpg']
        },
        {
          id: 'review-3',
          author: 'Adam',
          rating: 5,
          title: 'Great value for money',
          content: 'A solid tv unit, much higher quality than more expensive high street brands like B&M and Argos. Really solid, and went together no problem. Looks great and modern, while being very functional. All screws fit well first time.',
          date: '4 June 2025',
          verified: true,
          helpful: 1,
          images: ['https://m.media-amazon.com/images/I/615lhGmeQOL.jpg']
        },
        {
          id: 'review-4',
          author: 'Joe C.',
          rating: 4,
          title: 'Good value',
          content: 'Some slight damage to the top piece of wood, but not too noticeable. Pretty easy to put together (each piece is lettered) but the front cabinets do not align properly; one door sits slightly higher than the other due to the pre-drilled holes. Slightly too gloss to match my other walnut furniture but good overall for the price.',
          date: '15 June 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/71jio-c4SNL.jpg']
        },
        {
          id: 'review-5',
          author: 'suziemac',
          rating: 5,
          title: 'Great tv unit.',
          content: 'I had a bit of trouble with the delivery. It comes in 2 boxes and I only received 1 which I only discovered 2 weeks after the delivery. I contacted the seller and their customer service was great 3 days later I had my 2nd box. They did offer a refund but I\'d taken a while to pick the tv stand I wanted so was happy to get the missing box. Great customer service. It took me nearly 3 hours to put together in my defence I\'m 68 with arthritic hands so I\'m sure it could be put together quicker. The unit is lovely very sturdy. I had no scratches, dents etc. The instructions very clear and easy to follow. I\'d recommend this unit.',
          date: '18 March 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/61cGsmdRiLL.jpg']
        }
      ]}

      // Color Options
      productColorOptions={[
        { name: 'White', available: true }
      ]}

      // Size Options
      productSizeOptions={[
        { name: '140L', available: true }
      ]}

      // Variants
      productVariants={[
        {
          id: 'size-140l',
          type: 'size',
          name: 'Size',
          options: [
            { name: '140L', images: ['https://m.media-amazon.com/images/I/71rXehvPVCL._AC_SL1500_.jpg'] }
          ]
        }
      ]}

      // Stock and Quantity
      productStockCount={1}
      productQuantityLimit={1}

      // Safety Features
      productSafetyFeatures={[
        'Water-resistant particleboard panels',
        'Wear-resistant for long-lasting use',
        'Sturdy construction for stability',
        'Maximum load capacity of 50 kg',
        'Well-identified parts for safe assembly',
        'Clear assembly instructions included'
      ]}

      // Product Info
      productInfo={{
        category: 'TV Stands & Multimedia Centres',
        brand: 'VASAGLE',
        material: 'Particleboard',
        size: '140L (140 x 40 x 50 cm)',
        warranty: '30 Days Return',
        specialFeatures: 'Adjustable shelves, 2 doors, cable management'
      }}

      // Additional Product Details
      productCategory="TV Stands & Multimedia Centres"
      productMaterial="Particleboard"
      productCapacity="TVs up to 65 inches"
      productWarranty="30 Days Return"
      productRecycledContent="Made with materials from well-managed forests"
      productPartNumber="LTV027T46"
      productModelNumber="HU-XI-201"
      productASIN="B0BVD2N39H"
      productDateFirstAvailable="10 Feb. 2023"
      productDimensions="140L x 40W x 50H centimetres"
      productWeight="26.2 Kilograms"
      productVolume="140cm width"
      productStyle="Modern TV Unit"
      productPattern="Solid"
      productShape="Rectangular"
      productBatteriesRequired="No"
      productPackageQuantity="1"
    />
  );
};

export default VasagleTvUnitPage;
