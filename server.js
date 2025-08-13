const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'dist')));

// Data storage file
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

// API Routes

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await loadProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const products = await loadProducts();
    const product = products.find(p => p.id === req.params.id);
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load product' });
  }
});

// Create/Update product
app.post('/api/products', async (req, res) => {
  try {
    const products = await loadProducts();
    const product = req.body;
    
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
      res.json({ success: true, product });
    } else {
      res.status(500).json({ error: 'Failed to save product' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const products = await loadProducts();
    const filteredProducts = products.filter(p => p.id !== req.params.id);
    
    const success = await saveProducts(filteredProducts);
    if (success) {
      res.json({ success: true });
    } else {
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Update product views
app.post('/api/products/:id/views', async (req, res) => {
  try {
    const products = await loadProducts();
    const productIndex = products.findIndex(p => p.id === req.params.id);
    
    if (productIndex >= 0) {
      products[productIndex].pageViews = (products[productIndex].pageViews || 0) + 1;
      products[productIndex].lastUpdated = Date.now();
      
      const success = await saveProducts(products);
      if (success) {
        res.json({ success: true, pageViews: products[productIndex].pageViews });
      } else {
        res.status(500).json({ error: 'Failed to update product views' });
      }
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product views' });
  }
});

// Search products
app.get('/api/products/search/:query', async (req, res) => {
  try {
    const products = await loadProducts();
    const query = req.params.query.toLowerCase();
    
    const results = products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.features && product.features.some(feature => 
        feature.toLowerCase().includes(query)
      ))
    );
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search products' });
  }
});

// Get products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const products = await loadProducts();
    const category = req.params.category;
    
    const results = products.filter(product => product.category === category);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get products by category' });
  }
});

// Sync products from client
app.post('/api/products/sync', async (req, res) => {
  try {
    const clientProducts = req.body.products || [];
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
      res.json({ 
        success: true, 
        count: finalProducts.length,
        message: `Synced ${finalProducts.length} products`
      });
    } else {
      res.status(500).json({ error: 'Failed to sync products' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync products' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Products stored in: ${PRODUCTS_FILE}`);
  console.log(`🌐 Access at: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});
