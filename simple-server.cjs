const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = 3002;
const PRODUCTS_FILE = 'products.json';

// Ensure products file exists
async function ensureProductsFile() {
  try {
    await fs.access(PRODUCTS_FILE);
  } catch {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify([]));
  }
}

// Load products from file
async function loadProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

// Save products to file
async function saveProducts(products) {
  try {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving products:', error);
    return false;
  }
}

// Initialize products file
ensureProductsFile();

// Create HTTP server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Parse JSON body for POST requests
  let body = '';
  if (req.method === 'POST') {
    req.on('data', chunk => {
      body += chunk.toString();
    });
  }
  
  try {
    // Health check
    if (pathname === '/api/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      }));
      return;
    }
    
    // Get all products
    if (pathname === '/api/products' && req.method === 'GET') {
      const products = await loadProducts();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(products));
      return;
    }
    
    // Get product by ID
    if (pathname.startsWith('/api/products/') && req.method === 'GET') {
      const id = pathname.split('/')[3];
      const products = await loadProducts();
      const product = products.find(p => p.id === id);
      
      if (product) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(product));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Product not found' }));
      }
      return;
    }
    
    // Create/Update product
    if (pathname === '/api/products' && req.method === 'POST') {
      req.on('end', async () => {
        try {
          const product = JSON.parse(body);
          const products = await loadProducts();
          
          // Ensure product has required fields
          if (!product.id) {
            product.id = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          }
          
          product.lastUpdated = Date.now();
          if (!product.createdAt) {
            product.createdAt = Date.now();
          }
          
          // Update existing or add new
          const existingIndex = products.findIndex(p => p.id === product.id);
          if (existingIndex >= 0) {
            products[existingIndex] = product;
          } else {
            products.push(product);
          }
          
          const success = await saveProducts(products);
          if (success) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, product }));
          } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to save product' }));
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }
    
    // Delete product
    if (pathname.startsWith('/api/products/') && req.method === 'DELETE') {
      const id = pathname.split('/')[3];
      const products = await loadProducts();
      const filteredProducts = products.filter(p => p.id !== id);
      
      const success = await saveProducts(filteredProducts);
      if (success) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to delete product' }));
      }
      return;
    }
    
    // Update product views
    if (pathname.startsWith('/api/products/') && pathname.endsWith('/views') && req.method === 'POST') {
      const id = pathname.split('/')[3];
      const products = await loadProducts();
      const productIndex = products.findIndex(p => p.id === id);
      
      if (productIndex >= 0) {
        products[productIndex].pageViews = (products[productIndex].pageViews || 0) + 1;
        products[productIndex].lastUpdated = Date.now();
        
        const success = await saveProducts(products);
        if (success) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, pageViews: products[productIndex].pageViews }));
        } else {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to update product views' }));
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Product not found' }));
      }
      return;
    }
    
    // Search products
    if (pathname.startsWith('/api/products/search/') && req.method === 'GET') {
      const query = decodeURIComponent(pathname.split('/')[4]);
      const products = await loadProducts();
      
      const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        (product.features && product.features.some(feature => 
          feature.toLowerCase().includes(query.toLowerCase())
        ))
      );
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
      return;
    }
    
    // Get products by category
    if (pathname.startsWith('/api/products/category/') && req.method === 'GET') {
      const category = decodeURIComponent(pathname.split('/')[4]);
      const products = await loadProducts();
      
      const results = products.filter(product => product.category === category);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
      return;
    }
    
    // Sync products from client
    if (pathname === '/api/products/sync' && req.method === 'POST') {
      req.on('end', async () => {
        try {
          const { products: clientProducts = [] } = JSON.parse(body);
          const serverProducts = await loadProducts();
          
          // Merge products, keeping the most recent version
          const merged = new Map();
          
          // Add server products
          serverProducts.forEach(product => {
            merged.set(product.id, product);
          });
          
          // Add/update client products
          clientProducts.forEach(product => {
            const existing = merged.get(product.id);
            if (!existing || (product.lastUpdated > existing.lastUpdated)) {
              merged.set(product.id, product);
            }
          });
          
          const finalProducts = Array.from(merged.values());
          const success = await saveProducts(finalProducts);
          
          if (success) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 
              success: true, 
              count: finalProducts.length,
              message: `Synced ${finalProducts.length} products`
            }));
          } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to sync products' }));
          }
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }
    
    // Serve static files (React app)
    if (req.method === 'GET') {
      let filePath = pathname === '/' ? '/index.html' : pathname;
      filePath = path.join(__dirname, 'dist', filePath);
      
      try {
        const content = await fs.readFile(filePath);
        const ext = path.extname(filePath);
        
        let contentType = 'text/plain';
        if (ext === '.html') contentType = 'text/html';
        else if (ext === '.js') contentType = 'application/javascript';
        else if (ext === '.css') contentType = 'text/css';
        else if (ext === '.json') contentType = 'application/json';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.svg') contentType = 'image/svg+xml';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
        return;
      } catch (error) {
        // File not found, serve index.html for SPA routing
        if (pathname !== '/') {
          try {
            const indexContent = await fs.readFile(path.join(__dirname, 'dist', 'index.html'));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent);
            return;
          } catch (indexError) {
            // Index.html not found either
          }
        }
      }
    }
    
    // 404 for unknown routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
    
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Simple server running on port ${PORT}`);
  console.log(`📁 Products stored in: ${PRODUCTS_FILE}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
  console.log(`🔌 API health: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
