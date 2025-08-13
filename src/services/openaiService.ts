// IMPORTANT: Use Netlify serverless proxy when OPENAI key is not exposed to client
// We keep the local browser usage for dev only when VITE_OPENAI_API_KEY is provided
import OpenAI from 'openai';

const BROWSER_OPENAI_KEY = (import.meta as any).env?.VITE_OPENAI_API_KEY || '';
const useBrowserKey = !!BROWSER_OPENAI_KEY;
const openai = useBrowserKey ? new OpenAI({ apiKey: BROWSER_OPENAI_KEY, dangerouslyAllowBrowser: true }) : null as any;

export interface ProductData {
  id?: string;
  name: string;
  price: string;
  originalPrice: string;
  description: string;
  category: string;
  features: string[];
  images: string[];
  amazonChoice: boolean;
  prime: boolean;
  rating: number;
  reviews: any[];
  reviewCount: number;
  variants: any[];
  specifications: Record<string, string>;
  stock: number;
  store: string;
  route?: string;
  aboutThisItem: string[];
  productDetails: Record<string, string>;
  technicalDetails: Record<string, string>;
  countryRedirects: Array<{countryCode: string; redirectUrl: string}>;
  notes?: string;
  amazonLink?: string;
  adHeadline?: string;
  adCopy?: string;
  adCreatives?: string[];
  autoIncludeReviewImages?: boolean;
  folderId?: string;
}

export interface ParsedAmazonData {
  productData: ProductData;
  success: boolean;
  error?: string;
}

// --- Robust JSON parsing helpers ---
const stripCodeFences = (text: string): string => {
  // Remove ```json ... ``` or ``` ... ``` wrappers if present
  return text
    .replace(/```json\s*[\r\n]?/gi, '')
    .replace(/```/g, '');
};

const extractJsonString = (text: string): string => {
  // Fast path
  const stripped = stripCodeFences(text.trim());
  if (stripped.startsWith('{') && stripped.endsWith('}')) return stripped;

  // Balanced-brace extraction that respects strings and escapes
  let start = -1;
  let depth = 0;
  let inString = false;
  let prevChar = '';
  for (let i = 0; i < stripped.length; i++) {
    const ch = stripped[i];
    if (ch === '"' && prevChar !== '\\') {
      inString = !inString;
    } else if (!inString) {
      if (ch === '{') {
        if (depth === 0) start = i;
        depth++;
      } else if (ch === '}') {
        depth--;
        if (depth === 0 && start !== -1) {
          return stripped.substring(start, i + 1);
        }
      }
    }
    prevChar = ch;
  }
  return stripped;
};

const normalizeQuotes = (text: string): string => {
  // Replace smart quotes with standard quotes
  return text.replace(/[\u2018\u2019\u201C\u201D]/g, '"');
};

const removeTrailingCommas = (text: string): string => {
  // Remove trailing commas before ] or }
  return text.replace(/,\s*(?=[}\]])/g, '');
};

const aggressiveSanitize = (text: string): string => {
  let out = text || '';
  // Strip BOM/control chars and backticks
  out = out.replace(/^[\uFEFF\u200B]+/, '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').replace(/`/g, '');
  // Normalize smart quotes
  out = normalizeQuotes(out);
  // Replace inch marks like 30" with 30″ inside strings
  out = out.replace(/(\d)"/g, '$1″');
  // Remove trailing commas
  out = removeTrailingCommas(out);
  // Fix invalid single backslashes not part of a valid escape
  out = out.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
  return out;
};

const safeParseJson = (raw: string): any => {
  // First try as-is (response_format=json_object should already be pure JSON)
  try {
    return JSON.parse(raw);
  } catch {
    // Continue to next attempt
  }

  // Try balanced extraction
  const extracted = extractJsonString(normalizeQuotes(raw));
  try {
    return JSON.parse(extracted);
  } catch {
    // Continue to next attempt
  }

  // Try trailing comma repair
  try {
    return JSON.parse(removeTrailingCommas(extracted));
  } catch {
    // Continue to next attempt
  }

  // Aggressive local sanitization
  const sanitized = aggressiveSanitize(extracted);
  return JSON.parse(sanitized);
};

// Attempt a second-chance JSON repair using the model (robust fallback)
const repairJsonWithAI = async (raw: string): Promise<any | null> => {
  try {
    const prompt = `You are given text that is intended to be a JSON object but may contain mistakes (unescaped quotes like 30\", stray commas, or other formatting errors). Return ONLY a valid JSON object that faithfully represents the same data. Do not include code fences or commentary.`;

    const resp = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0,
      max_tokens: 4000,
      response_format: { type: 'json_object' as const },
      messages: [
        { role: 'system', content: 'You fix and return only valid JSON.' },
        { role: 'user', content: prompt },
        { role: 'user', content: raw.substring(0, 100000) },
      ],
    });

    const fixed = resp.choices[0]?.message?.content?.trim();
    if (!fixed) return null;
    return safeParseJson(fixed);
  } catch {
    return null;
  }
};

export const parseAmazonProductData = async (
  amazonText: string,
  productImages: string[] = [],
  reviewImages: string[] = []
): Promise<ParsedAmazonData> => {
  try {
    const prompt = `
You are an expert at parsing Amazon product information. I will provide you with text copied from an Amazon product page, and you must extract and structure the information into STRICT JSON.

IMPORTANT OUTPUT RULES (must follow):
- Return ONLY a JSON object. No commentary, no code fences, no trailing commas.
- Use valid JSON booleans (true/false), numbers, and strings (with proper escaping).
- If a field is missing, fill it with a sensible default of the correct type.

CATEGORY ASSIGNMENT RULES:
- You MUST assign the product to one of these EXACT categories based on the product description:
  * "Home & Garden" - for furniture, home decor, garden tools, storage solutions, kitchen items
  * "Electronics" - for computers, phones, gadgets, audio/video equipment, smart devices
  * "Clothing" - for apparel, shoes, accessories, fashion items
  * "Sports & Outdoors" - for sports equipment, outdoor gear, fitness items, camping supplies
  * "Beauty" - for cosmetics, skincare, hair care, personal grooming products
  * "Books" - for books, magazines, educational materials, reading materials
  * "Health & Personal Care" - for medical supplies, vitamins, health products, personal hygiene
  * "Baby" - for baby products, toys, clothing, feeding supplies, nursery items
  * "Toys & Games" - for children's toys, board games, puzzles, entertainment items
  * "Automotive" - for car parts, accessories, maintenance products, vehicle-related items
  * "Tools & Home Improvement" - for hand tools, power tools, building materials, DIY supplies
  * "Office Products" - for office supplies, stationery, business equipment, workplace items
- Analyze the product name, description, and features carefully to determine the most appropriate category
- Do NOT create new categories or use variations of these exact names

Here's the Amazon product text:
"""
${amazonText}
"""

Return a JSON object exactly matching this schema shape (example values shown):
{
  "name": "Full product title exactly as shown",
  "price": "£19.99",
  "originalPrice": "£29.99",
  "description": "Brief product description or subtitle",
  "category": "Home & Garden",
  "features": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
  "amazonChoice": true,
  "prime": true,
  "rating": 4.5,
  "reviewCount": 12743,
  "specifications": {
    "Brand": "Brand name",
    "Material": "Material type",
    "Dimensions": "Product dimensions",
    "Weight": "Product weight",
    "Color": "Available colors",
    "Size": "Available sizes"
  },
  "stock": 100,
  "store": "Brand name or store name",
  "aboutThisItem": [
    "Detailed about item point 1 with benefits",
    "Detailed about item point 2 with benefits",
    "Detailed about item point 3 with benefits",
    "Detailed about item point 4 with benefits",
    "Detailed about item point 5 with benefits"
  ],
  "productDetails": {
    "Package Dimensions": "exact dimensions if available",
    "Item Weight": "exact weight if available",
    "ASIN": "product ASIN if available",
    "Manufacturer": "manufacturer name",
    "Item model number": "model number if available",
    "Department": "target department",
    "Date First Available": "availability date if shown",
    "Brand": "brand name"
  },
  "technicalDetails": {
    "Brand": "brand name",
    "Model": "model number",
    "Material": "material composition",
    "Color": "color options",
    "Size": "size specifications",
    "Weight": "item weight",
    "Dimensions": "product dimensions"
  },
  "variants": [
    {
      "id": "color",
      "type": "Color",
      "name": "Color",
      "options": [
        {"name": "Black", "images": []},
        {"name": "White", "images": []}
      ]
    }
  ],
  "customerReviews": [
    {
      "author": "Customer name or username",
      "rating": 5,
      "title": "Review title/headline",
      "content": "Full review content/comment exactly as written",
      "date": "DD/MM/YYYY",
      "verified": true,
      "helpful": 10
    }
  ]
}

Strictly follow valid JSON syntax.
`;

    let jsonResponse: string | undefined;
    if (useBrowserKey) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a precise data extraction assistant that returns only valid JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 4000,
        response_format: { type: "json_object" as const }
      });
      jsonResponse = response.choices[0]?.message?.content?.trim();
    } else {
      const proxyResp = await fetch('/.netlify/functions/openai-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model: 'gpt-4o-mini', temperature: 0.2, max_tokens: 4000 })
      });
      const data = await proxyResp.json();
      if (!data?.success) throw new Error(data?.error || 'OpenAI proxy failed');
      jsonResponse = String(data.content || '').trim();
    }

    if (!jsonResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response with robust fallback
    let parsedData: any;
    try {
      parsedData = safeParseJson(jsonResponse);
    } catch (e1) {
      try {
        // Last resort: model-based repair
        const repaired = await repairJsonWithAI(jsonResponse);
        if (repaired) {
          parsedData = repaired;
        } else {
          // Final guard: throw user-friendly error
          throw new Error('Could not parse product data');
        }
      } catch (e2) {
        // Re-throw to outer handler
        throw e2;
      }
    }
    
    // Debug: Log what AI extracted
    console.log('🤖 AI Extracted Data:', {
      name: parsedData.name,
      hasCustomerReviews: !!parsedData.customerReviews,
      reviewCount: parsedData.customerReviews?.length || 0
    });

    // Ensure we generate a unique, safe route slug
    const baseSlug = (parsedData.name || 'product')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);

    const makeUniqueSlug = (slug: string) => {
      try {
        const created = JSON.parse(localStorage.getItem('createdProducts') || '[]');
        // Use the correct dynamic registry lightweight key
        const dynamic = JSON.parse(localStorage.getItem('dynamicProducts') || '[]');
        let unique = slug;
        let attempt = 1;
        const routeExists = (s: string) => {
          const path = `/${s}`;
          return (
            created.some((p: any) => p.route === path) ||
            dynamic.some((p: any) => p.route === path)
          );
        };
        while (routeExists(unique)) {
          attempt += 1;
          unique = `${slug}-${attempt}`.substring(0, 60);
        }
        return unique;
      } catch {
        return slug;
      }
    };
    const uniqueSlug = makeUniqueSlug(baseSlug);

    // Create the complete product data with manual images
    const productData: ProductData = {
      ...parsedData,
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      images: productImages.length > 0 ? productImages : [], // Use manually uploaded images
      // Enforce business rule: fixed pricing and free shipping context
      price: '£9.99',
      originalPrice: '£9.99',
      // Always show -90% discount on page components that use this field
      // The template will display this if present
      discount: '90%',
      prime: true,
      reviews: parsedData.customerReviews && parsedData.customerReviews.length > 0 
        ? mergeExtractedReviewsWithImages(parsedData.customerReviews, reviewImages)
        : generateReviews(parsedData.reviewCount || 12743, reviewImages),
      route: `/${uniqueSlug}`,
      countryRedirects: [],
      adCreatives: reviewImages.length > 0 ? reviewImages : [],
      autoIncludeReviewImages: true
    };

    return {
      productData,
      success: true
    };

  } catch (error) {
    console.error('Error parsing Amazon data:', error);
    return {
      productData: {} as ProductData,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Merge extracted reviews with review images - 1 image per review, no duplicates
const isPositiveReview = (review: any): boolean => {
  try {
    const ratingOk = typeof review.rating === 'number' ? review.rating >= 4 : true;
    const text = `${review.title || ''} ${review.content || ''}`;
    const negative = /\b(terrible|bad|poor|disappoint|broken|worst|refund|return|hate|awful|one star|two stars|not recommend|avoid)\b/i.test(text);
    return ratingOk && !negative;
  } catch {
    return true;
  }
};

const mergeExtractedReviewsWithImages = (extractedReviews: any[], reviewImages: string[] = []) => {
  console.log('🔍 Review merging process started:', {
    extractedReviewsCount: extractedReviews?.length || 0,
    reviewImagesCount: reviewImages.length,
    positiveReviewsCount: extractedReviews?.filter(isPositiveReview).length || 0
  });

  if (!extractedReviews || extractedReviews.length === 0) {
    console.log('🔍 No extracted reviews, generating default reviews with all images');
    return generateReviews(12743, reviewImages); // Generate default reviews with all images
  }

  // Create a copy of review images to avoid duplicates
  const availableImages = [...reviewImages];
  
  // Filter positive reviews and assign images
  const aiReviews = extractedReviews
    .filter(isPositiveReview)
    .map((review, index) => {
      // Each review gets exactly one image if available
      const assignedImage = availableImages.length > 0 ? [availableImages.shift()!] : [];

      console.log(`🔍 AI Review ${index + 1}: Assigned ${assignedImage.length} image(s) to ${review.author || 'Customer'}`);

      return {
        id: Date.now() + index,
        author: review.author || 'Customer',
        rating: typeof review.rating === 'number' ? review.rating : 5,
        title: review.title || 'Great product',
        content: review.content || 'Very satisfied with this purchase.',
        date: review.date || new Date().toLocaleDateString('en-GB'),
        verified: review.verified !== false,
        helpful: typeof review.helpful === 'number' ? review.helpful : Math.floor(Math.random() * 20) + 1,
        images: assignedImage
      };
    });

  // If there are leftover images, add them to default reviews
  if (availableImages.length > 0) {
    console.log(`🔍 Adding ${availableImages.length} extra review images to default reviews`);
    const defaultReviews = generateReviews(12743, availableImages);
    console.log(`🔍 Generated ${defaultReviews.length} default reviews with extra images`);
    return [...aiReviews, ...defaultReviews];
  }

  console.log(`🔍 Review merging complete: ${aiReviews.length} AI reviews, no extra images`);
  return aiReviews;
};

// Generate realistic reviews
const generateReviews = (reviewCount: number, reviewImages: string[] = []) => {
  const reviewerNames = [
    'Sarah Johnson', 'Mike Chen', 'Emma Thompson', 'David Rodriguez', 'Lisa Wang',
    'James Miller', 'Anna Kowalski', 'Tom Wilson', 'Maria Garcia', 'Alex Smith',
    'Jenny Lee', 'Robert Taylor', 'Sophie Brown', 'Chris Evans', 'Maya Patel'
  ];

  const reviewTitles = [
    'Excellent quality!',
    'Great value for money',
    'Perfect for my needs',
    'Highly recommended',
    'Good product overall',
    'Amazing purchase',
    'Very satisfied',
    'Exactly as described',
    'Great build quality',
    'Love this product'
  ];

  const reviewContents = [
    'This product exceeded my expectations. The quality is outstanding and it arrived quickly. Would definitely buy again!',
    'Really happy with this purchase. Good value for the price and works exactly as advertised.',
    'Perfect product for what I needed. Easy to use and great quality materials.',
    'Excellent customer service and fast delivery. The product is exactly as shown in the pictures.',
    'Very pleased with this item. It\'s well-made and serves its purpose perfectly.',
    'Great quality and arrived on time. Exactly what I was looking for.',
    'This is a fantastic product. Great quality and excellent value for money.',
    'Really impressed with the build quality. Looks great and works perfectly.',
    'Excellent product, fast shipping, and great customer service. Highly recommend!',
    'Perfect addition to my home. Great quality and exactly as described.'
  ];

  const reviews = [] as any[];
  
  // When called for extra images, generate exactly the number of images we have
  // Otherwise, use the normal calculation
  const numReviewsToGenerate = reviewImages.length > 0 
    ? Math.min(reviewImages.length, 8) // Max 8 reviews, but use number of available images
    : Math.min(8, Math.max(3, Math.floor(reviewCount / 1000)));

  console.log(`🔍 Generating ${numReviewsToGenerate} default reviews with ${reviewImages.length} images`);

  // Create a copy of review images to distribute one per review
  const availableImages = [...reviewImages];

  for (let i = 0; i < numReviewsToGenerate; i++) {
    // Each review gets exactly one image if available, no duplicates
    const assignedImage = availableImages.length > 0 ? [availableImages.shift()!] : [];

    // Skip negative reviews: simple heuristic by keywords and rating
    const content = reviewContents[Math.floor(Math.random() * reviewContents.length)];
    const rating = Math.random() > 0.8 ? 4 : 5;
    const isNegative = /terrible|bad|poor|disappoint|broken|worst|refund|return|hate|awful|one star/i.test(content) || rating < 4;
    if (isNegative) {
      continue;
    }

    reviews.push({
      id: Date.now() + i + Math.random() * 1000, // Ensure unique IDs
      author: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
      rating,
      title: reviewTitles[Math.floor(Math.random() * reviewTitles.length)],
      content,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      verified: true,
      helpful: Math.floor(Math.random() * 20) + 1,
      images: assignedImage
    });
  }

  return reviews;
};

export { openai };
