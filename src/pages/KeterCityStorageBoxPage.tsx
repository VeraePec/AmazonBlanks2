import React from 'react';
import ProductPage2 from '../components/ProductPage2';

const KeterCityStorageBoxPage: React.FC = () => {
  return (
    <ProductPage2
      // Basic Information
      productId="keter-city-storage-box"
      productName="Keter City 113L Outdoor 96% recycled Small Balcony Garden Furniture Storage Box Grey Wood Panel Effect | Fade Free | All Weather Resistant | Safe and Secure | Zero Maintenance | 2 year Warranty"
      productBrand="Keter"
      productRating={4.7}
      productRatingsCount={15213}
      productBoughtInMonth="3K+"
      
      // Pricing
      productPrice={{
        gb: '£9.99',
        dk: '63.85 kr',
        no: '99 kr',
        es: '€32.50',
        ch: 'CHF 35.00',
        default: '£9.99'
      }}
      productOriginalPrice={{
        gb: '£32.49',
        dk: '400 kr',
        no: '430 kr',
        es: '€37.50',
        ch: 'CHF 40.00',
        default: '£32.49'
      }}
      productDiscount="14%"
      
      // Content
      productImages={[
        'https://m.media-amazon.com/images/I/71XODmtPilL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71X4lyt6piL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/91S4XMkpujL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61ojZJ8DvbL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/91ZJaE9xhVL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/51RGeJSHEBL._AC_.jpg'
      ]}
      productBreadcrumb={[
        'Home',
        'Garden',
        'Storage',
        'Keter City Storage Box'
      ]}
      productFeatures={[
        '113L storage capacity',
        'Perfect for balconies and small areas',
        'Lockable option for added security',
        'Made of durable, weatherproof resin',
        '96% recycled material',
        'Fade-free and maintenance-free',
        'Grey wood panel effect finish',
        'All weather resistant construction',
        'Built-in handles for easy moving',
        '5-minute assembly with no tools required'
      ]}
      productAboutThisItem={[
        'Ideal outdoor garden storage box for garden tools and equipment, garden furniture cushions, garden games and accessories',
        'Decorative wood effect panelled style with 113 L capacity keeping all ventilated and dry',
        'Perfect for balconies and small areas and ready to use in just 5 minutes',
        'Made of durable, weatherproof, maintenance and fade-free and 96% recycled resin',
        'Assembled external dimensions: 57.8 x 44 x 55 cm (L x W x H); Internal dimensions: 57.7 x 41.6 x 51.6 cm (L x W x H)'
      ]}
      
      // Reviews
      productReviews={[
        {
          id: '1',
          author: 'Mrs. A',
          rating: 5,
          title: "It's perfect 👌",
          content: 'Absolutely perfect! So very pleased with this garden storage container. It\'s very sturdy, fits and clips into the relevant slots, looks amazing, very good value for money along with adding a padlock if needed and the lid is a great feature, highly recommend.',
          date: '2025-08-08',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/81t+jf+qcYL.jpg']
        },
        {
          id: '2',
          author: 'mrs r g reeves',
          rating: 5,
          title: 'Great assembly, nice product, good value.',
          content: 'This was really well packed. All pieces fitted together well, a couple needed a little persuasion with a flat block of wood, just because they were a bit tight for me to push together. Easy to move into position, very sturdy once assembled, and lid fits well on top. Hopefully it will be watertight as all edges overlap and there are no holes anywhere. Perfect for regularly used tools on the patio, saving a trip to the garage, and keeping everything close at hand.',
          date: '2025-01-07',
          verified: true,
          helpful: 12,
          images: ['https://m.media-amazon.com/images/I/71Lec2EpNsL.jpg']
        },
        {
          id: '3',
          author: 'Kindle Customer',
          rating: 5,
          title: 'Ketter Storage Box',
          content: 'Bought this as a parcel box for the front door and it fitted the space perfectly. It was really easy to put together as no tools required and simple to move as it is light weight. Build quality feels good as I would expect from ketter and the lid opens and closes without catching. This Ketter storage box was great value for money and is currently on offer.',
          date: '2025-07-31',
          verified: true,
          helpful: 3,
          images: ['https://m.media-amazon.com/images/I/81zuRtsprNL.jpg']
        },
        {
          id: '4',
          author: 'Shahbaz',
          rating: 4,
          title: 'Solid so far so good',
          content: 'I recently bought this Keter City 113L outdoor storage box and I\'m really pleased with it so far. It fits perfectly on my small balcony and offers a decent amount of storage for its size. The grey wood panel effect looks stylish and modern, and I love that it\'s made from 96% recycled materials. It feels sturdy and has already stood up well to a bit of rain, with no signs of fading or damage.',
          date: '2025-05-26',
          verified: true,
          helpful: 1,
          images: ['https://m.media-amazon.com/images/I/81anpRH6OML.jpg']
        },
        {
          id: '5',
          author: 'Helena Sharkey',
          rating: 5,
          title: 'Sturdy, spacious & a great price',
          content: 'Brilliant storage box, very easy to assemble and access with lift up top. It holds plenty stuff. Great price and very sturdy, this is the second storage product purchased from Keter and I would highly recommend them.',
          date: '2025-07-12',
          verified: true,
          helpful: 1,
          images: ['https://m.media-amazon.com/images/I/81KDsNu3Q+L.jpg']
        }
      ]}
      
      // Product Details
      productDetails={{
        color: 'Grey',
        material: 'Resin',
        specialFeature: 'Lockable, Weathertight',
        style: 'Wood effect',
        capacity: '113L',
        recycled: '96%'
      }}
      
      // Technical Details
      productTechnicalDetails={{
        manufacturer: 'Keter',
        partNumber: '17208324',
        itemModelNumber: '242798',
        size: '57.8 x 44 x 55 cm',
        style: 'Wood effect',
        pattern: 'Wood panel',
        shape: 'Rectangular',
        itemPackageQuantity: '1',
        batteriesRequired: 'No',
        asin: 'B07NQ6R7R1',
        dateFirstAvailable: '14 Feb. 2019'
      }}
      
      // Options
      productColorOptions={[
        { name: 'Wood effect', available: true },
        { name: 'Rattan style', available: false }
      ]}
      productSizeOptions={[
        { name: '113L', available: true }
      ]}
      productVariants={[
        {
          id: 'style',
          type: 'style',
          name: 'Style',
          options: [
            { name: 'Wood effect', images: ['https://m.media-amazon.com/images/I/71XODmtPilL._AC_SL1500_.jpg'] },
            { name: 'Rattan style', images: ['https://m.media-amazon.com/images/I/71X4lyt6piL._AC_SL1500_.jpg'] }
          ]
        }
      ]}
      
      // Technical Details
      productStockCount={50}
      productQuantityLimit={5}
      productSafetyFeatures={[
        'Weather resistant',
        'Fade free',
        'All weather resistant',
        'Safe and secure',
        'Zero maintenance',
        'Lockable design'
      ]}
      productInfo={{
        'Category': 'Garden Storage',
        'Brand': 'Keter',
        'Material': 'Resin',
        'Capacity': '113L',
        'Warranty': '2 years',
        'Recycled Content': '96%'
      }}
      productCategory="Garden Storage"
      productMaterial="Resin"
      productCapacity="113L"
      productWarranty="2 years"
      productRecycledContent="96%"
      productPartNumber="17208324"
      productModelNumber="242798"
      productASIN="B07NQ6R7R1"
      productDateFirstAvailable="14 Feb. 2019"
      productDimensions="57.8 x 44 x 55 cm"
      productWeight="3.65 kg"
      productVolume="113L"
      productAssemblyTime="5 minutes"
      productStyle="Wood effect"
      productPattern="Wood panel"
      productShape="Rectangular"
      productBatteriesRequired="No"
      productPackageQuantity="1"
    />
  );
};

export default KeterCityStorageBoxPage;
