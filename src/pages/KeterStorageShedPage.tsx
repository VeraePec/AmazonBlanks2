import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductPageTemplate from '../components/ProductPageTemplate';
import { useCountrySelector } from '../hooks/useCountrySelector';

const KeterStorageShedPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCountry } = useCountrySelector();

  const productData = {
    id: 'keter-storage-shed-nova',
    name: 'Keter Store it Out Nova Outdoor Garden Storage Shed',
    price: '£125.00',
    originalPrice: '£181.02',
    discount: '31%',
    images: [
      'https://m.media-amazon.com/images/I/81nkADjDAbL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/910TF1aqBKL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/91L1fuj4+hL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81ByjoSNTZL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/911s9OrxX-L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/611Ypdn2IlL._AC_SL1500_.jpg'
    ],
    store: 'Keter',
    category: 'Garden Storage',
    rating: 4.4,
    reviewCount: 7246,
    aboutThisItem: [
      'Ideal outdoor storage solution for garden tools and equipment, BBQ and accessories and x2 120L wheelie bins.',
      'Elegant wood effect panels that opens from the top or the front and with a lockable feature for secure closure.',
      'Heavy-duty floor with built-in support for shelving and 880 L capacity. Shelves not included.',
      'Assembled dimensions: 132 x 71.5 x 113.5 cm (L x W x H); internal dimensions: 122 x 61 x 108.8 cm (L x W x H).',
      'Weatherproof, zero maintenance, easy clean, fade free construction.',
      'Built-in ventilation panels for ample airflow.',
      'Two doors on front and a top lid with unique locking system.',
      'Can lock doors and top together or just lock doors for child-safe access from above (padlock not included).',
      'Assembly time: approximately 20-40 minutes, recommended for 1 person.'
    ],
    features: [
      '880L storage capacity',
      'Light Grey with Dark Grey Lid',
      'Resin construction with wood effect finish',
      'UV resistant and waterproof',
      'Lockable for security',
      'Built-in shelf support',
      'Ventilated design',
      'Heavy-duty floor panel',
      'Easy assembly',
      'Weatherproof outdoor storage'
    ],
    productDetails: {
      'Brand': 'Keter',
      'Colour': 'Light Grey with Dark Cover',
      'Material': 'Resin',
      'Product Dimensions': '71.5D x 132W x 113.5H centimetres',
      'Item Weight': '21.5 Kilograms',
      'Volume': '880 litres',
      'UV Protection': 'UV Resistant',
      'Special Features': 'Heavy Duty, Water-Resistant, Waterproof',
      'Usage': 'outdoor storage, indoor storage, garden storage',
      'Assembly Time': '20-40 minutes',
      'Recommended Assembly': '1 person'
    },
    technicalDetails: {
      'Manufacturer': 'Keter',
      'Part Number': '249317',
      'Item Model Number': '249317',
      'Size': '132 x 71.5 x 113.5 cm',
      'Style': 'Single',
      'Pattern': 'Single',
      'Shape': 'Horizontal',
      'Item Package Quantity': '1',
      'Batteries Required': 'No',
      'ASIN': 'B08XQVQPQ5',
      'Date First Available': '1 Mar. 2021'
    },
    reviews: [
      {
        id: '1',
        author: 'PaTi',
        rating: 5,
        title: 'Your Space-Saving Storage Solution!',
        content: 'The Keter 249317 Store it Out Nova Outdoor Garden Storage Shed is the perfect storage solution for your outdoor space. With its compact size and clever design, this storage shed offers ample space to keep your garden tools, equipment, and other belongings organized and protected from the elements. Space-Saving Design: The standout feature of the Keter Store it Out Nova is its space-saving design. Despite its generous storage capacity, the shed\'s compact dimensions of 32 x 71.5 x 113.5 cm allow it to fit easily in small outdoor spaces, such as patios, balconies, or gardens. Ample Storage Space: Don\'t let the size fool you; this storage shed offers plenty of room to store your gardening essentials and more. Whether it\'s gardening tools, cushions, outdoor toys, or even bicycles, you can keep them all neatly stored and easily accessible. Weather-Resistant and Durable: The Store it Out Nova is built to withstand the elements. Made from high-quality, weather-resistant materials, this storage shed ensures that your belongings stay dry and protected from rain, sun, and wind. Easy Access: The double doors with a hinged lid provide easy access to the contents of the shed. You can easily open and close the doors to retrieve or store items without any hassle. Light Grey Wood-Look Finish: The shed features a stylish light grey wood-look finish, adding a touch of elegance to your outdoor space. It blends seamlessly with your garden decor and complements any setting. Lockable for Security: For added security, the Store it Out Nova comes with a built-in locking mechanism. You can securely lock the doors to keep your belongings safe and protected. Easy Assembly: The storage shed is designed for easy assembly, allowing you to set it up quickly and start using it right away. Versatile Use: While perfect for garden storage, this shed is also versatile in its use. It can be used as additional storage for your patio, poolside, or even in a garage or utility area. In conclusion, the Keter 249317 Store it Out Nova Outdoor Garden Storage Shed is a smart and practical solution to keep your outdoor space organized and clutter-free. With its space-saving design, ample storage space, weather-resistant construction, and easy access, this shed ticks all the boxes for efficient outdoor storage. Upgrade your outdoor organization with the Keter Store it Out Nova and enjoy a tidy and well-kept garden space.',
        date: '2023-07-23',
        verified: true,
        helpful: 45,
        images: ['https://m.media-amazon.com/images/I/810IFH0goHL.jpg']
      },
      {
        id: '2',
        author: 'Miss Pickles',
        rating: 5,
        title: 'Fab',
        content: 'Once built, the storage unit appears nice and sturdy. Everything lines up during build and the lock device is a nice touch. You have two holes for locks. I haven\'t noticed any leaks of yet!! Cons, my product didn\'t come with instructions but it took me all of ten minutes to figure out construction and another 10mins to put together. I was informed later, instruction can found on utube!!. That aside, it looks good and all belonging are safe and dry.... so it\'s perfect.',
        date: '2025-06-04',
        verified: true,
        helpful: 6,
        images: ['https://m.media-amazon.com/images/I/81THZPlwE7L.jpg']
      },
      {
        id: '3',
        author: 'Steve Bowden',
        rating: 4,
        title: 'Great product, easy to assemble, neat and tidy storage for garden stuff',
        content: 'Great product, easy to assemble, neat and tidy storage for garden stuff. The only criticism is that it does not have a simple lid stay, so you need to hold up the lid with one hand. So I will make one to hold the lid up as necessary.',
        date: '2025-08-08',
        verified: true,
        helpful: 1,
        images: ['https://m.media-amazon.com/images/I/714V2x9+LKL.jpg']
      },
      {
        id: '4',
        author: 'Nia',
        rating: 5,
        title: 'Waterproof, spacious & easy to build',
        content: 'This arrived quickly. Took 30 mins to construct. Very easy to do. Ideal to have second pair of hands to hold pieces in place whilst putting screws in. Watertight, spacious and robust. Nice 😊',
        date: '2025-08-03',
        verified: true,
        helpful: 1,
        images: ['https://m.media-amazon.com/images/I/71FX507VNHL.jpg']
      },
      {
        id: '5',
        author: 'Janey',
        rating: 5,
        title: 'Bin storage',
        content: 'Very lightweight and if honest a little flimsy we have drilled it into the floor to prevent movement. Doesnt fit all of the recycling bins in due to hight it on fits the black ones. Does the job of hiding unsightly bins',
        date: '2025-04-24',
        verified: true,
        helpful: 0,
        images: ['https://m.media-amazon.com/images/I/81zZUOHACSL.jpg']
      }
    ],
    variants: [
      {
        name: 'Size',
        options: [
          { name: '132 x 71.5 x 113.5 cm', price: '£125.00', selected: true },
          { name: 'Ultra', price: '£181.02' }
        ]
      },
      {
        name: 'Colour',
        options: [
          { name: 'Light Grey with Dark Cover', price: '£125.00', selected: true },
          { name: 'Beige Brown', price: '£125.00' },
          { name: 'Dark Grey', price: '£125.00' }
        ]
      },
      {
        name: 'Pattern',
        options: [
          { name: 'Single', price: '£125.00', selected: true },
          { name: 'Solid Wood Effect', price: '£125.00' }
        ]
      }
    ],
    amazonChoice: true,
    prime: true,
    countryRedirects: []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      <ProductPageTemplate product={productData} />
    </div>
  );
};

export default KeterStorageShedPage;
