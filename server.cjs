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
// Serve public images (persisted uploads)
const IMAGES_ROOT = path.join(__dirname, 'public', 'images');
const PRODUCTS_DIR = path.join(IMAGES_ROOT, 'products');

async function ensureImageDirs() {
  try { await fs.mkdir(IMAGES_ROOT, { recursive: true }); } catch {}
  try { await fs.mkdir(PRODUCTS_DIR, { recursive: true }); } catch {}
}
ensureImageDirs();

// Expose /images/* publicly
app.use('/images', express.static(IMAGES_ROOT, {
  fallthrough: true,
  maxAge: '365d',
  etag: true,
}));

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

// Cross-browser sync storage
const syncEvents = new Map();
const SYNC_EVENT_TTL = 5 * 60 * 1000; // 5 minutes

// Clean up old sync events
setInterval(() => {
  const now = Date.now();
  for (const [key, event] of syncEvents.entries()) {
    if (now - event.timestamp > SYNC_EVENT_TTL) {
      syncEvents.delete(key);
    }
  }
}, 60000); // Clean up every minute

// API Routes
// Broadcast sync events across browsers
app.post('/api/broadcast-sync', async (req, res) => {
  try {
    const event = req.body;
    if (!event || !event.type) {
      return res.status(400).json({ error: 'Invalid event data' });
    }

    // Store the event for other browsers to fetch
    const eventKey = `${event.browserId}_${event.timestamp}`;
    syncEvents.set(eventKey, {
      ...event,
      receivedAt: Date.now()
    });

    // Keep only recent events (last 100)
    if (syncEvents.size > 100) {
      const sortedKeys = Array.from(syncEvents.keys()).sort((a, b) => {
        const eventA = syncEvents.get(a);
        const eventB = syncEvents.get(b);
        return eventB.timestamp - eventA.timestamp;
      });
      
      // Remove oldest events
      for (let i = 50; i < sortedKeys.length; i++) {
        syncEvents.delete(sortedKeys[i]);
      }
    }

    res.json({ 
      success: true, 
      message: 'Event broadcasted',
      eventCount: syncEvents.size 
    });
  } catch (error) {
    console.error('Broadcast sync failed:', error);
    res.status(500).json({ error: 'Broadcast failed' });
  }
});

// Get recent sync events for other browsers
app.get('/api/sync-events', async (req, res) => {
  try {
    const { browserId, since } = req.query;
    const sinceTime = since ? parseInt(since) : Date.now() - 60000; // Default to last minute
    
    const recentEvents = Array.from(syncEvents.values())
      .filter(event => event.timestamp > sinceTime && event.browserId !== browserId)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 50); // Limit to 50 most recent events

    res.json({ 
      success: true, 
      events: recentEvents,
      totalEvents: syncEvents.size
    });
  } catch (error) {
    console.error('Get sync events failed:', error);
    res.status(500).json({ error: 'Failed to get events' });
  }
});

// Upload a single image (data URL, blob/object URL after conversion client-side, or remote URL)
app.post('/api/upload-image', async (req, res) => {
  try {
    const { dataUrl, url, filename } = req.body || {};
    let buffer;
    let ext = 'jpg';
    if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
      const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
      if (!match) return res.status(400).json({ error: 'Invalid data URL' });
      const mime = match[1] || 'image/jpeg';
      ext = mime.split('/')[1] || 'jpg';
      buffer = Buffer.from(match[2], 'base64');
    } else if (typeof url === 'string') {
      const r = await fetch(url);
      if (!r.ok) return res.status(400).json({ error: `Failed to fetch remote image: ${r.status}` });
      const arrayBuf = await r.arrayBuffer();
      buffer = Buffer.from(arrayBuf);
      const contentType = r.headers.get('content-type') || 'image/jpeg';
      ext = (contentType.split('/')[1] || 'jpg').split(';')[0];
    } else {
      return res.status(400).json({ error: 'Provide dataUrl or url' });
    }

    const safeBase = (filename || `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`).replace(/[^a-zA-Z0-9-_\.]/g, '_');
    const fullName = safeBase.includes('.') ? safeBase : `${safeBase}.${ext}`;
    const finalPath = path.join(PRODUCTS_DIR, fullName);
    await fs.writeFile(finalPath, buffer);
    const publicUrl = `/images/products/${fullName}`;
    res.json({ success: true, url: publicUrl });
  } catch (err) {
    console.error('Upload failed', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Upload multiple images
app.post('/api/upload-images', async (req, res) => {
  try {
    const { items } = req.body || {};
    if (!Array.isArray(items)) return res.status(400).json({ error: 'items must be an array' });
    const results = [];
    for (const item of items) {
      const r = await fetch('http://localhost:' + PORT + '/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!r.ok) throw new Error('Batch upload failed');
      results.push(await r.json());
    }
    res.json({ success: true, results });
  } catch (err) {
    console.error('Batch upload failed', err);
    res.status(500).json({ error: 'Batch upload failed' });
  }
});

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
