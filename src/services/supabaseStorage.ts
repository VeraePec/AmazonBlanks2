import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { CentralizedProduct } from '../utils/centralizedStorage';

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const TABLE = 'products';

export const isSupabaseConfigured = (): boolean => !!supabase;

export const supabaseHealth = async (): Promise<{ status: string } > => {
  if (!supabase) return { status: 'unhealthy' };
  const { error } = await supabase.from(TABLE).select('id', { count: 'exact', head: true }).limit(1);
  return { status: error ? 'unhealthy' : 'healthy' };
};

export const saveProduct = async (product: CentralizedProduct): Promise<CentralizedProduct> => {
  if (!supabase) throw new Error('Supabase not configured');
  const payload = {
    id: product.id,
    data: product,
    last_updated: product.lastUpdated || Date.now(),
    created_at: new Date(product.createdAt || Date.now()).toISOString(),
    name: product.name,
    category: product.category,
    route: product.route || `/${product.id}`,
  };
  const { error } = await supabase.from(TABLE).upsert(payload, { onConflict: 'id' });
  if (error) throw error;
  return product;
};

export const getAllProducts = async (): Promise<CentralizedProduct[]> => {
  if (!supabase) return [];
  const { data, error } = await supabase.from(TABLE).select('data').order('last_updated', { ascending: false });
  if (error || !data) return [];
  return data.map((row: any) => row.data as CentralizedProduct);
};

export const getProductById = async (id: string): Promise<CentralizedProduct | null> => {
  if (!supabase) return null;
  const { data, error } = await supabase.from(TABLE).select('data').eq('id', id).maybeSingle();
  if (error || !data) return null;
  return data.data as CentralizedProduct;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw error;
  return true;
};

export const updateProductViews = async (id: string): Promise<number> => {
  if (!supabase) return 0;
  const existing = await getProductById(id);
  if (!existing) return 0;
  const updated = { ...existing, pageViews: (existing.pageViews || 0) + 1, lastUpdated: Date.now() } as CentralizedProduct;
  await saveProduct(updated);
  return updated.pageViews || 0;
};

export const searchProducts = async (query: string): Promise<CentralizedProduct[]> => {
  if (!supabase) return [];
  // Client-side filter for portability. For large datasets, create SQL indices and server filtering.
  const all = await getAllProducts();
  const q = (query || '').toLowerCase();
  return all.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    (p.description || '').toLowerCase().includes(q) ||
    (p.category || '').toLowerCase().includes(q) ||
    (p.features || []).some((f) => (f || '').toLowerCase().includes(q))
  );
};

export const getProductsByCategory = async (category: string): Promise<CentralizedProduct[]> => {
  if (!supabase) return [];
  // Prefer server-side filter on JSON column if table is created with proper columns
  const { data, error } = await supabase.from(TABLE).select('data').eq('category', category);
  if (error || !data) return [];
  return data.map((row: any) => row.data as CentralizedProduct);
};

export const migrateFromLocalStorage = async (): Promise<void> => {
  if (!supabase) return;
  try {
    const existingProducts = localStorage.getItem('createdProducts');
    if (existingProducts) {
      const products: CentralizedProduct[] = JSON.parse(existingProducts);
      for (const p of products) {
        try { await saveProduct(p); } catch {}
      }
      localStorage.removeItem('createdProducts');
    }
  } catch {}
};

export const supabaseStorage = {
  isSupabaseConfigured,
  supabaseHealth,
  saveProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProductViews,
  searchProducts,
  getProductsByCategory,
  migrateFromLocalStorage,
};


