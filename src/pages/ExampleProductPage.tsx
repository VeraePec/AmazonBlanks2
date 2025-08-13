import React from 'react';
import ProductPageTemplate from '../components/ProductPageTemplate';

const ExampleProductPage = () => {
  const productData = {
    name: "Example Product Name - Detailed Description Here",
    brand: "Example Brand",
    store: "Example Store",
    rating: 4.6,
    ratingsCount: 2980,
    boughtInMonth: "50+ bought in past month",
    amazonChoice: true,
    price: "£9.99",
    originalPrice: "£59.99",
    discount: "83%",
    images: [
      "https://m.media-amazon.com/images/I/51Xtd-TBo8L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81PUI3WfocL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/615m9vySElL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81Av0H8fICL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81D1cOFU50L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71DjFjPOfHL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71HidfOW75L._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/71MoBGSWhLL._AC_SL1500_.jpg"
    ],
    breadcrumb: [
      "Home & Kitchen",
      "Furniture", 
      "Storage & Organisation",
      "Storage Benches"
    ],
    colorOptions: [
      {
        name: 'Matte White',
        price: '£9.99',
        originalPrice: '£59.99',
        savings: '83%',
        available: true
      },
      {
        name: 'Greige',
        price: '£9.99',
        originalPrice: '£59.49',
        savings: '83%',
        available: true
      },
      {
        name: 'Honey Brown',
        price: '£9.99',
        originalPrice: '£59.49',
        savings: '83%',
        available: true
      },
      {
        name: 'Rustic Brown',
        price: '£9.99',
        originalPrice: '£50.99',
        savings: '80%',
        available: true
      }
    ],
    sizeOptions: [
      {
        name: '80W cm',
        price: '£9.99',
        originalPrice: '£59.99',
        savings: '83%',
        available: true
      },
      {
        name: '100W cm',
        price: '£9.99',
        originalPrice: '£59.99',
        savings: '83%',
        available: true
      }
    ],
    features: [
      "<strong>Elegant addition to your home:</strong> Matte white storage bench easily matches the rest of your furniture with ribbed design",
      "<strong>Large storage space:</strong> 100 x 40 x 46 cm size with plenty of storage for blankets, shoes, or toys",
      "<strong>Handle for comfort, hinge for safety:</strong> 2 handles for easy transport, 2 safety hinges prevent finger injuries",
      "<strong>Sturdy construction:</strong> Particle board frame supports up to 100kg, perfect as a shoe bench",
      "<strong>Easy assembly:</strong> Clear instructions included with all necessary tools"
    ],
    aboutThisItem: [
      "<strong>Elegant addition to your home:</strong> This matte white storage bench easily matches the rest of your furniture and the ribbed design on the front makes it eye-catching",
      "<strong>Large storage space to hide and display:</strong> The size is 100 x 40 x 46 cm; this storage box has plenty of storage space for blankets or shoes",
      "<strong>Handle for comfort, hinge for safety:</strong> With the 2 handles you can easily transport the product, while the 2 hinges prevent fingers from getting caught",
      "<strong>A shoe bench too sturdy:</strong> Place this storage bench in the hallway as a shoe bench as its particle board frame supports up to 100kg",
      "<strong>Easy assembly:</strong> Detailed instructions and the accessory kit included allow for easy assembly"
    ],
    productDetails: {
      "Brand": "Example Brand",
      "Colour": "Matte White",
      "Material": "Engineered Wood",
      "Size": "100W cm",
      "Style": "Modern"
    },
    technicalDetails: {
      "Brand": "Example Brand",
      "Product Dimensions": "100 x 40 x 46 cm",
      "Colour": "Matte White",
      "Capacity": "100 Kilograms",
      "Material": "Engineered Wood",
      "Frame Material": "Wood",
      "Style": "Modern",
      "Item Weight": "19.5 kg"
    },
    productInfo: {
      "Product Dimensions": "100 x 40 x 46 cm; 19.5 kg",
      "Special Features": "Lockable",
      "Item Weight": "19.5 kg",
      "Material": "Engineered Wood",
      "ASIN": "B09B9WBQNY",
      "Date First Available": "27 July 2021",
      "Manufacturer": "Example Brand"
    },
    stockCount: 8,
    deliveryInfo: "No Import Fees Deposit & £15.99 delivery to United Kingdom",
    quantityLimit: 1,
    safetyFeatures: [
      "2 safety hinges included"
    ]
  };

  const redirectUrl = 'https://linkly.link/2C4ln';

  return (
    <ProductPageTemplate 
      productData={productData} 
      redirectUrl={redirectUrl} 
    />
  );
};

export default ExampleProductPage;