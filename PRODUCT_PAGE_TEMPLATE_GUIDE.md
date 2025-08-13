# ProductPageTemplate - Complete Implementation Guide

## Overview

The `ProductPageTemplate` is a comprehensive, reusable React component that exactly replicates the layout, structure, and functionality of the VASAGLE Storage Chest product page. This template ensures consistent design across all product pages.

## Template Features

### ✅ Complete Structure Match
- **Exact layout**: 12-column grid system (5-4-3 for left-middle-right columns)
- **Responsive design**: Mobile and desktop optimized layouts
- **Image placement**: All three images positioned exactly as reference
- **Section ordering**: Perfect match to VASAGLE page structure

### ✅ All Visual Elements
- **Breadcrumb navigation**: Dynamic breadcrumb generation
- **Product title and store link**: Proper Amazon blue styling
- **Rating system**: 5-star display with ratings count
- **Amazon's Choice badge**: Conditional display
- **Pricing section**: Clearance banner, discount percentages, price history
- **Color/Size options**: Grid-based selection with hover states
- **Mobile price display**: Complete mobile-specific pricing UI
- **Purchase buttons**: Amazon's signature yellow/orange buttons
- **Trust indicators**: Security, delivery, and return badges

### ✅ Functional Components
- **Dynamic timers**: Live countdown and viewer counters
- **Quantity management**: Plus/minus controls with limits
- **Sticky ATC**: Scroll-triggered sticky add-to-cart
- **Color/Size selection**: Interactive option selection
- **Responsive images**: Desktop/mobile specific image placement
- **Reviews & Q&A**: Integrated review and question components

## Usage

### 1. Import the Template
```typescript
import ProductPageTemplate from '../components/ProductPageTemplate';
```

### 2. Define Product Data
```typescript
const productData = {
  // Required fields
  name: "Product Name - Full Description",
  brand: "Brand Name",
  store: "Store Name", 
  rating: 4.6,
  ratingsCount: 2980,
  boughtInMonth: "50+ bought in past month",
  price: "£9.99",
  images: ["image1.jpg", "image2.jpg", "image3.jpg"],
  breadcrumb: ["Category1", "Category2", "Category3"],
  features: ["Feature 1", "Feature 2"],
  aboutThisItem: ["Description 1", "Description 2"],
  productDetails: { "Brand": "Name", "Color": "White" },
  technicalDetails: { "Dimensions": "100x40x46 cm" },
  productInfo: { "ASIN": "B123456789" },
  stockCount: 8,

  // Optional fields
  amazonChoice: true,
  originalPrice: "£59.99",
  discount: "83%",
  colorOptions: [
    {
      name: 'White',
      price: '£9.99',
      originalPrice: '£59.99',
      savings: '83%',
      available: true
    }
  ],
  sizeOptions: [...],
  deliveryInfo: "Free delivery info",
  quantityLimit: 1,
  safetyFeatures: ["Safety feature 1"]
};
```

### 3. Use the Template
```typescript
<ProductPageTemplate 
  productData={productData} 
  redirectUrl="https://your-redirect-url.com" 
/>
```

## Data Structure Reference

### Core Product Data
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Full product title |
| `brand` | string | ✅ | Brand name |
| `store` | string | ✅ | Store name for "Visit Store" link |
| `rating` | number | ✅ | Product rating (0-5) |
| `ratingsCount` | number | ✅ | Number of ratings |
| `boughtInMonth` | string | ✅ | Purchase frequency text |
| `price` | string | ✅ | Current price (e.g., "£9.99") |
| `images` | string[] | ✅ | Product image URLs |
| `breadcrumb` | string[] | ✅ | Navigation breadcrumb |
| `stockCount` | number | ✅ | Available stock count |

### Feature Data
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `features` | string[] | ✅ | Bullet point features |
| `aboutThisItem` | string[] | ✅ | Detailed descriptions |
| `productDetails` | object | ✅ | Key-value product details |
| `technicalDetails` | object | ✅ | Technical specifications |
| `productInfo` | object | ✅ | Additional product info |

### Optional Enhancement Data
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amazonChoice` | boolean | ❌ | Show Amazon's Choice badge |
| `originalPrice` | string | ❌ | Original price for discounts |
| `discount` | string | ❌ | Discount percentage |
| `colorOptions` | ColorOption[] | ❌ | Color variants |
| `sizeOptions` | SizeOption[] | ❌ | Size variants |
| `deliveryInfo` | string | ❌ | Delivery information |
| `quantityLimit` | number | ❌ | Maximum quantity per customer |
| `safetyFeatures` | string[] | ❌ | Safety feature list |

### Color/Size Option Structure
```typescript
interface ColorOption {
  name: string;
  price: string;
  originalPrice?: string;
  savings?: string;
  available?: boolean;
}
```

## Template Sections (In Order)

### 1. Header & Breadcrumb
- Site header with navigation
- Dynamic breadcrumb navigation

### 2. Main Product Grid (3 Columns)
#### Left Column (5/12) - Image Gallery
- Primary product images
- Thumbnail navigation
- Zoom functionality

#### Middle Column (4/12) - Product Details
- Product title and store link
- Rating and purchase frequency
- Amazon's Choice badge (optional)
- Pricing with discount display
- Color/size selection (optional)
- Mobile-specific pricing display
- Features list

#### Right Column (3/12) - Purchase Options
- Desktop pricing display
- Stock status and delivery info
- Quantity selector
- Add to Basket / Buy Now buttons
- Shipping and seller information

### 3. Product Description Section
- Mobile-only second image
- "About this item" detailed descriptions
- Product details table
- Mobile-only third image

### 4. Technical Specifications
- Desktop-only second image
- Technical details in 2-column layout

### 5. Customer Reviews
- Integrated ProductReviews component

### 6. Questions & Answers
- Integrated ProductQA component

### 7. Product Information
- Final product specifications

### 8. Footer & Sticky Elements
- Site footer
- Sticky add-to-cart (mobile)

## Styling Guidelines

### Colors (Amazon Brand)
- **Primary blue**: `#007185` (links, buttons)
- **Star rating**: `#ffa41c` (ratings)
- **Add to Basket**: `#ffd814` (primary action)
- **Buy Now**: `#ffa41c` (secondary action)
- **Discount red**: `text-red-700` (pricing)

### Typography
- **Product title**: `text-lg sm:text-2xl font-normal`
- **Section headers**: `text-lg sm:text-xl font-medium`
- **Body text**: `text-sm`
- **Pricing**: `text-3xl font-bold`

### Responsive Breakpoints
- **Mobile**: Default styling
- **Desktop**: `lg:` prefix (1024px+)
- **Tablet**: `sm:` prefix (640px+)

## Best Practices

### 1. Data Preparation
- Ensure all required fields are provided
- Use high-quality images (minimum 800px width)
- Write compelling feature descriptions
- Include accurate technical specifications

### 2. Image Guidelines
- **Minimum 3 images** for full template functionality
- **Square aspect ratio** recommended
- **First image**: Main product view
- **Second image**: Side/detail view (shown on desktop/mobile)
- **Third image**: Additional detail (mobile only)

### 3. Content Guidelines
- Use **bold text** in features: `<strong>Feature Name:</strong> Description`
- Keep pricing format consistent: `£X.XX`
- Provide accurate stock counts
- Include comprehensive technical details

### 4. Performance
- Optimize images for web delivery
- Use descriptive alt text for accessibility
- Test on mobile and desktop devices

## Integration Examples

### Simple Product
```typescript
const simpleProduct = {
  name: "Basic Product Name",
  brand: "Brand",
  store: "Store", 
  rating: 4.5,
  ratingsCount: 100,
  boughtInMonth: "10+ bought in past month",
  price: "£9.99",
  images: ["image1.jpg"],
  breadcrumb: ["Category"],
  features: ["Basic feature"],
  aboutThisItem: ["Basic description"],
  productDetails: { "Brand": "Name" },
  technicalDetails: { "Weight": "1kg" },
  productInfo: { "ASIN": "B123" },
  stockCount: 5
};
```

### Complex Product with All Options
```typescript
const complexProduct = {
  // All required fields...
  amazonChoice: true,
  originalPrice: "£99.99",
  discount: "90%",
  colorOptions: [
    { name: 'White', price: '£9.99', originalPrice: '£99.99', savings: '90%' },
    { name: 'Black', price: '£9.99', originalPrice: '£99.99', savings: '90%' }
  ],
  sizeOptions: [
    { name: 'Small', price: '£9.99', originalPrice: '£99.99', savings: '90%' },
    { name: 'Large', price: '£12.99', originalPrice: '£109.99', savings: '88%' }
  ],
  deliveryInfo: "Free delivery to UK",
  quantityLimit: 2,
  safetyFeatures: ["Safety tested", "CE marked"]
};
```

## Mandatory Usage Rule

**When creating any new product page, you MUST use this ProductPageTemplate exactly as defined. No modifications, no alternative layouts, no exceptions.** This ensures complete consistency across all product pages and maintains the authentic Amazon appearance.

The template replicates every visual and functional element of the VASAGLE Storage Chest page, providing a perfect foundation for all future product pages.