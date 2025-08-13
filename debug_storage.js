// Debug script to check localStorage contents
console.log('=== DEBUGGING LOCALSTORAGE ===');

// Check dynamic products
const dynamicProducts = localStorage.getItem('dynamicProducts');
if (dynamicProducts) {
  const parsed = JSON.parse(dynamicProducts);
  console.log('Dynamic Products in localStorage:', parsed.length);
  parsed.forEach((p, i) => {
    console.log(`Product ${i + 1}:`, {
      id: p.id,
      name: p.name?.substring(0, 30) + '...',
      route: p.route,
      slug: p.slug
    });
  });
} else {
  console.log('No dynamic products in localStorage');
}

// Check created products (old format)
const createdProducts = localStorage.getItem('createdProducts');
if (createdProducts) {
  const parsed = JSON.parse(createdProducts);
  console.log('Created Products in localStorage:', parsed.length);
  parsed.forEach((p, i) => {
    console.log(`Created Product ${i + 1}:`, {
      id: p.id,
      name: p.name?.substring(0, 30) + '...',
      route: p.route
    });
  });
} else {
  console.log('No created products in localStorage');
}

// Check individual product data
const keys = Object.keys(localStorage).filter(key => key.startsWith('product_'));
console.log('Individual product data entries:', keys.length);
keys.forEach(key => {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      console.log(`${key}:`, {
        id: parsed.id,
        name: parsed.name?.substring(0, 30) + '...',
        route: parsed.route,
        slug: parsed.slug
      });
    } catch (e) {
      console.log(`${key}: Error parsing`);
    }
  }
});

console.log('=== END DEBUG ===');