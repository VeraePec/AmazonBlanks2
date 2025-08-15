const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = 3001;
const PRODUCTS_FILE = 'products.json';

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
    
    // Cross-browser sync endpoints
    if (pathname === '/api/broadcast-sync' && req.method === 'POST') {
      req.on('end', async () => {
        try {
          const event = JSON.parse(body);
          if (!event || !event.type) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid event data' }));
            return;
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

          console.log(`📡 Event broadcasted: ${event.type} from ${event.browserId}`);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: true, 
            message: 'Event broadcasted',
            eventCount: syncEvents.size 
          }));
        } catch (error) {
          console.error('Broadcast sync failed:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Broadcast failed' }));
        }
      });
      return;
    }

    // Get recent sync events for other browsers
    if (pathname === '/api/sync-events' && req.method === 'GET') {
      const { browserId, since } = parsedUrl.query;
      const sinceTime = since ? parseInt(since) : Date.now() - 60000; // Default to last minute
      
      const recentEvents = Array.from(syncEvents.values())
        .filter(event => event.timestamp > sinceTime && event.browserId !== browserId)
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 50); // Limit to 50 most recent events

      console.log(`📡 Fetched ${recentEvents.length} events for browser ${browserId}`);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        success: true, 
        events: recentEvents,
        totalEvents: syncEvents.size
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
    
    // Save product
    if (pathname === '/api/products' && req.method === 'POST') {
      req.on('end', async () => {
        try {
          const product = JSON.parse(body);
          const products = await loadProducts();
          
          // Update existing or add new
          const existingIndex = products.findIndex(p => p.id === product.id);
          if (existingIndex >= 0) {
            products[existingIndex] = { ...products[existingIndex], ...product };
          } else {
            products.push(product);
          }
          
          await saveProducts(products);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, product }));
        } catch (error) {
          console.error('Save product failed:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Save failed' }));
        }
      });
      return;
    }
    
    // Delete product
    if (pathname.startsWith('/api/products/') && req.method === 'DELETE') {
      const id = pathname.split('/')[3];
      const products = await loadProducts();
      const filteredProducts = products.filter(p => p.id !== id);
      
      if (filteredProducts.length < products.length) {
        await saveProducts(filteredProducts);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Product deleted' }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Product not found' }));
      }
      return;
    }
    
    // Default response
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
    
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Cross-browser sync server running on port ${PORT}`);
  console.log(`📡 Sync endpoints:`);
  console.log(`   POST /api/broadcast-sync - Broadcast events`);
  console.log(`   GET  /api/sync-events - Fetch events`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`   GET  /api/products - Get all products`);
  console.log(`   POST /api/products - Save product`);
  console.log(`   GET  /api/products/:id - Get product by ID`);
  console.log(`   DELETE /api/products/:id - Delete product`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
