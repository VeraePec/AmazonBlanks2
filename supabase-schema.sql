-- Supabase schema for cross-browser product synchronization
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR PRIMARY KEY,
  data JSONB NOT NULL,
  last_updated BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM NOW()) * 1000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  category TEXT,
  route TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_last_updated ON products(last_updated DESC);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_name ON products USING GIN (name gin_trgm_ops);

-- Create sync_events table for cross-browser synchronization
CREATE TABLE IF NOT EXISTS sync_events (
  id VARCHAR PRIMARY KEY,
  type VARCHAR NOT NULL CHECK (type IN ('product-added', 'product-updated', 'product-deleted', 'force-sync')),
  product_id VARCHAR,
  timestamp BIGINT NOT NULL,
  device_id VARCHAR NOT NULL,
  browser_id VARCHAR NOT NULL,
  data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for sync_events
CREATE INDEX IF NOT EXISTS idx_sync_events_timestamp ON sync_events(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sync_events_device ON sync_events(device_id);
CREATE INDEX IF NOT EXISTS idx_sync_events_type ON sync_events(type);

-- Enable Row Level Security (RLS) for products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
-- Note: This is permissive for demo purposes. In production, you might want stricter policies.
CREATE POLICY "Allow all operations on products" ON products
  FOR ALL USING (true)
  WITH CHECK (true);

-- Enable RLS for sync_events table
ALTER TABLE sync_events ENABLE ROW LEVEL SECURITY;

-- Create policy for sync_events
CREATE POLICY "Allow all operations on sync_events" ON sync_events
  FOR ALL USING (true)
  WITH CHECK (true);

-- Create function to clean up old sync events (optional)
CREATE OR REPLACE FUNCTION cleanup_old_sync_events()
RETURNS void AS $$
BEGIN
  DELETE FROM sync_events 
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to clean up old sync events (runs daily)
-- Note: This requires the pg_cron extension which might not be available on all Supabase plans
-- You can remove this if you don't have access to pg_cron
-- SELECT cron.schedule('cleanup-sync-events', '0 2 * * *', 'SELECT cleanup_old_sync_events();');

-- Grant necessary permissions
GRANT ALL ON products TO anon, authenticated;
GRANT ALL ON sync_events TO anon, authenticated;

-- Create helpful views
CREATE OR REPLACE VIEW recent_products AS
SELECT 
  id,
  (data->>'name') as name,
  (data->>'category') as category,
  (data->>'price') as price,
  last_updated,
  created_at
FROM products
ORDER BY last_updated DESC;

CREATE OR REPLACE VIEW recent_sync_events AS
SELECT 
  id,
  type,
  product_id,
  timestamp,
  device_id,
  browser_id,
  created_at
FROM sync_events
ORDER BY timestamp DESC
LIMIT 100;

-- Insert some sample data (optional - remove if you don't want sample data)
-- INSERT INTO products (id, data, name, category, route) VALUES
-- ('sample-1', '{"name": "Sample Product", "price": "£9.99", "category": "General", "description": "This is a sample product"}', 'Sample Product', 'General', '/sample-product')
-- ON CONFLICT (id) DO NOTHING;
