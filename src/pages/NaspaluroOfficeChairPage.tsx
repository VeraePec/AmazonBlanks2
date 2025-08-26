import React from 'react';
import ProductPage3 from '../components/ProductPage3';

const NaspaluroOfficeChairPage: React.FC = () => {
  return (
    <ProductPage3
      // Basic Information
      productId="naspaluro-office-chair"
      productName="naspaluro Office Chair Ergonomic Desk with 90° Flip-up Armrest Lumbar Support, Height Adjustable Chair, Executive Swivel Computer Padded Seat Cushion for Home/Office"
      productBrand="naspaluro"
      productRating={4.2}
      productRatingsCount={6480}
      productBoughtInMonth="2K+"

      // Pricing - Following consistent structure: UK £9.99, NO 99kr, DK 63.85kr, ZA R199.99
      productPrice={{
        gb: '£9.99',
        dk: '63.85 kr',
        no: '99 kr',
        es: '€32.50',
        ch: 'CHF 35.00',
        fr: '€32.50',
        tr: '₺850.00',
        za: 'R199.99',
        default: '£9.99'
      }}
      productOriginalPrice={{
        gb: '£79.99',
        dk: '799.90 kr',
        no: '799.90 kr',
        es: '€79.99',
        ch: 'CHF 87.00',
        fr: '€79.99',
        tr: '₺6800.00',
        za: 'R1599',
        default: '£79.99'
      }}
      productDiscount="88%"

      // Product Images
      productImages={[
        'https://m.media-amazon.com/images/I/71-tJxUoTJL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/718JsvF96fL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61LEFvjKGKL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61QzRAme3uL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71-aSHvsQGL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/613+4mcklfL._AC_SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71QZkf7Bj0L._AC_SL1500_.jpg'
      ]}

      // Breadcrumb
      productBreadcrumb={['Home', 'Home & Kitchen', 'Home Office Furniture', 'Office Chairs', 'Desk Chairs']}

      // Features
      productFeatures={[
        '90° flip-up armrests for space-saving storage',
        'Ergonomic curved backrest with lumbar support',
        'Premium polyester mesh backrest for airflow',
        'High-density foam seat cushion for comfort',
        'SGS Grade 2 certified gas lift for safety',
        'Heavy-duty nylon base with smooth-rolling casters',
        'Rocking mode for relaxation',
        'Height adjustable design',
        'Easy 15-minute assembly',
        'Supports up to 102kg weight capacity'
      ]}

      // About This Item
      productAboutThisItem={[
        '【90° Flip-up Armrests】naspaluro ergonomic chair with adjustable padded armrests provides shoulder and upper body support, suitable for most people to relax yourself when sitting for a long time. Office chair allows you to flip the arms up and put the chair under the desk for saving space.',
        '【Ergonomic Backrest】Curved backrest is constructed to fit the human anatomy and provide an ergonomic support to keep you focused and relaxed. Premium polyester mesh backrest keeps the body cool and cozy by enabling continuous airflow. Rocking mode brings you more ease while resting.',
        '【Less Pressure Seat】The seat cushion is filled with a whole piece of high-density sponge, soft and strong to ensure minimum pressure on your hips and make you maintain a comfortable state. This home office chair will help you reduce fatigue and keep you productive all day.',
        '【Authoritative Quality Inspection】SGS of Grade 2 Certified Gaslift, more safe and stable. Heavy-duty base and nylon smooth-rolling casters provide the ergonomic chair with excellent stability and mobility. It also passed the push back test of 102kg and static pressure of 950kg.',
        '【Easy to Assemble】A detailed assembly manual and all needed parts are included. You can easily assemble the computer chair by following the steps of the instructions without additional tools. It is easy to set up and can be done by one person in only 15 minutes.',
        '【Reliable Service】Customer satisfaction is our eternal motivation. If any defects caused by non-human reasons, please contact us: Login your account > choose \'Your orders\' > find the order ID > click \'Contact seller\'. We will offer you effective and professional solutions within 24 hours.'
      ]}

      // Product Details
      productDetails={{
        'Brand': 'naspaluro',
        'Colour': 'Black',
        'Product dimensions': '60D x 60W x 102H centimetres',
        'Size': '50 x 50 x 92 CM',
        'Back style': 'Solid Back',
        'Material': 'Plastic',
        'Item weight': '9.07 Kilograms',
        'Frame material': 'Acrylonitrile Butadiene Styrene, Nylon',
        'Seat material type': 'Foam',
        'Special Features': 'Arm Rest, Cushion Availability, Rolling',
        'Colour Name': 'Black',
        'Style Name': 'Without Headrest'
      }}

      // Technical Details
      productTechnicalDetails={{
        'Model Number': 'B801',
        'Product Dimensions': '52 x 50 x 58 cm; 9.07 kg',
        'Item Weight': '9.07 kg',
        'Special Features': 'Arm Rest, Cushion Availability, Rolling',
        'ASIN': 'B0BB17PW7D',
        'Best Sellers Rank': '#1 in Desk Chairs',
        'Date First Available': '18 Aug. 2022'
      }}

      // Reviews with exactly 1 image per review (following memory rule)
      productReviews={[
        {
          id: '1',
          author: 'Jon Graham',
          rating: 5,
          title: 'Comfortable, Supportive, and Great Value — So Good I\'ve bought another!',
          content: 'Excellent comfort for long days. The high back and adjustable headrest make a big difference, especially for someone like me (6\'1") who tends to spend long hours at the desk. The lumbar support is firm but comfortable, and I\'ve definitely noticed less back stiffness since switching to this chair. The flip-up armrests are surprisingly handy - brilliant when you need to slide the chair under the desk. Easy to assemble and adjust, smart tidy look, and solid value for money.',
          date: '9 June 2025',
          verified: true,
          helpful: 18,
          images: ['https://m.media-amazon.com/images/I/61ca-Q5Md+L.jpg']
        },
        {
          id: '2',
          author: 'Mrs H J Simpson',
          rating: 5,
          title: 'Excellent choice.',
          content: 'Love it! Maybe colour is not exactly as expected, but otherwise brilliant. Dead easy to put together. Clear instructions with diagrams. All parts well packaged and labelled. I did it in less than 30 minutes. Really comfy and retractable arms mean I can push it under my desk when not in use. Good value and hope it lasts.',
          date: '4 July 2025',
          verified: true,
          helpful: 2,
          images: ['https://m.media-amazon.com/images/I/81py9bJkqAL.jpg']
        },
        {
          id: '3',
          author: 'Rue',
          rating: 4,
          title: 'Great chair for the price',
          content: 'This naspaluro office chair is super comfy, easy to set up, and perfect for working from home. The flip-up armrests are really handy, and the mesh back keeps things cool. It rolls smoothly and feels good for long hours at a desk. Only downsides? The wheels feel a bit cheap, and there\'s no headrest. But honestly, for the price, it\'s a solid buy. Great for a home office or student setup!',
          date: '3 July 2025',
          verified: true,
          helpful: 1,
          images: ['https://m.media-amazon.com/images/I/71kK4OzxndL.jpg']
        },
        {
          id: '4',
          author: 'Shamas Shakil',
          rating: 5,
          title: 'Great for the Price',
          content: 'The chair is easy to assemble and will most likely take you about an hour to do so, coming from someone with little experience with assembling things. It is comfortable and the adjustable lumbar support is a good addition. The chair\'s reclining function allows for a bit of rest when needed. It also looks nice. It is not the most flashy chair, but is serviceable in that department. Overall, if you are on a budget and in need of a chair, this one is a great choice.',
          date: '28 June 2025',
          verified: true,
          helpful: 2,
          images: ['https://m.media-amazon.com/images/I/61FqVMoZVlL.jpg']
        },
        {
          id: '5',
          author: 'Balaji Pedam',
          rating: 5,
          title: 'Good Chair',
          content: 'Very comfortable and good chair, easy to assemble and good quality. Happy with the purchase. Good Style and adjustment capability with reclining ability.',
          date: '24 June 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/61WIEI5TnAL.jpg']
        },
        {
          id: '6',
          author: 'Amazon Customer',
          rating: 5,
          title: 'Good product',
          content: 'Very nice chair. Bit fiddly to put together but well worth it. Very comfortable and great value for money. The mesh back provides excellent support and the adjustability options make it perfect for long working sessions.',
          date: '10 August 2025',
          verified: true,
          helpful: 0,
          images: ['https://m.media-amazon.com/images/I/61Rkuqu8HsL.jpg']
        },
        {
          id: '7',
          author: 'Siri Ari Salvador',
          rating: 4,
          title: 'Practical and easy to assemble.',
          content: 'Everything you need. Easy to put together. Take your time and it will be perfect. Using it as a work from home chair, really comfy, but I would prefer more padding. The colour is beautiful and the handles are adjustable, you can move them out of the way which is great. No cracking sounds yet, hopefully never, but worth the price. It\'s nice.',
          date: '11 June 2025',
          verified: true,
          helpful: 3,
          images: ['https://m.media-amazon.com/images/I/71OEC5ZLeoL.jpg']
        }
      ]}

      // Color Options
      productColorOptions={[
        { name: 'Black', available: true },
        { name: 'Grey', available: true },
        { name: 'Pink', available: true }
      ]}

      // Size Options
      productSizeOptions={[
        { name: 'Without Headrest', available: true },
        { name: 'With Headrest', available: true }
      ]}

      // Product Variants
      productVariants={[
        {
          id: 'headrest-option',
          type: 'Style',
          name: 'Headrest Option',
          options: [
            {
              name: 'Without Headrest',
              images: ['https://m.media-amazon.com/images/I/71-tJxUoTJL._AC_SL1500_.jpg']
            },
            {
              name: 'With Headrest',
              images: ['https://m.media-amazon.com/images/I/718JsvF96fL._AC_SL1500_.jpg']
            }
          ]
        }
      ]}

      // Stock and Quantity
      productStockCount={50}
      productQuantityLimit={5}

      // Safety Features
      productSafetyFeatures={[
        'SGS Grade 2 Certified Gas Lift',
        'Heavy-duty nylon base',
        'Smooth-rolling casters',
        '102kg weight capacity tested',
        '950kg static pressure tested',
        'Anti-tip design',
        'Stable 5-star base'
      ]}

      // Product Info
      productInfo={{
        'Best Seller': '#1 Best Seller in Desk Chairs',
        'Amazon Choice': 'Amazon\'s Choice for Office Chairs',
        'Assembly Time': '15 minutes',
        'Warranty': '1 year manufacturer warranty',
        'Return Policy': '30-day return'
      }}

      // Product Category and Details
      productCategory="Office Chairs"
      productMaterial="Plastic, Foam, Nylon"
      productCapacity="102kg weight capacity"
      productWarranty="1 year manufacturer warranty"
      productRecycledContent="Eco-friendly materials used"
      productPartNumber="B801"
      productModelNumber="B801"
      productASIN="B0BB17PW7D"
      productDateFirstAvailable="18 Aug. 2022"
      productDimensions="60D x 60W x 102H centimetres"
      productWeight="9.07 Kilograms"
      productVolume="Compact design"
      productSeatHeight="Adjustable height"
      productStorageCapacity="Space-saving flip-up armrests"
      productLockable="Locking recline mechanism"
      productAssemblyTime="15 minutes"
      productStyle="Ergonomic Office Chair"
      productPattern="Mesh and foam design"
      productShape="Ergonomic curved backrest"
      productBatteriesRequired="No"
      productPackageQuantity="1"
    />
  );
};

export default NaspaluroOfficeChairPage;
