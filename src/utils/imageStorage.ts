// Utility for handling image storage in dynamic products
// Converts large base64 images to blob URLs to avoid localStorage quota issues

export const createImageStorageUtils = () => {
  const blobRegistry = new Map<string, string>(); // hash -> blob URL (session cache)

  // IndexedDB setup for persistent blobs
  const DB_NAME = 'ImageStoreDB';
  const STORE_NAME = 'images';

  const openDb = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'hash' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };

  const putBlob = async (hash: string, blob: Blob): Promise<void> => {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put({ hash, blob });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  };

  const getBlob = async (hash: string): Promise<Blob | null> => {
    const db = await openDb();
    return await new Promise<Blob | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(hash);
      req.onsuccess = () => resolve(req.result ? (req.result as any).blob : null);
      req.onerror = () => reject(req.error);
    });
  };

  const base64ToBlob = (dataUrl: string): Blob => {
    const [meta, data] = dataUrl.split(',');
    const mime = meta.match(/data:(.*?);/)?.[1] || 'image/jpeg';
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  };

  const generateHash = (): string => 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

  // Convert base64/blob/object URL to an IndexedDB reference string
  const processImageForPersistence = async (imageUrl: string): Promise<string> => {
    console.log('🖼️ Processing image for persistence:', imageUrl?.substring(0, 50) + '...');
    
    if (!imageUrl || typeof imageUrl !== 'string') {
      console.log('🖼️ Invalid image URL, returning placeholder');
      return '/placeholder.svg';
    }
    
    // Persist blob: object URLs into IndexedDB
    if (imageUrl.startsWith('blob:')) {
      console.log('🖼️ Processing blob URL');
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const hash = generateHash();
        await putBlob(hash, blob);
        const result = `idb-ref:${hash}`;
        console.log('🖼️ Converted blob to IndexedDB reference:', result);
        return result;
      } catch (e) {
        console.warn('Failed to persist blob URL, keeping as-is', e);
        return imageUrl;
      }
    }
    
    // Persist remote HTTP(S) images to IndexedDB so refreshes don't depend on expiring links
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      console.log('🖼️ Processing HTTP URL');
      try {
        const res = await fetch(imageUrl, { mode: 'cors' });
        if (!res.ok) return imageUrl; // keep original if fetch fails (e.g., CORS)
        const blob = await res.blob();
        const hash = generateHash();
        await putBlob(hash, blob);
        const result = `idb-ref:${hash}`;
        console.log('🖼️ Converted HTTP URL to IndexedDB reference:', result);
        return result;
      } catch {
        return imageUrl; // fallback to original URL
      }
    }
    
    // Persist base64 data URLs
    if (imageUrl.startsWith('data:')) {
      console.log('🖼️ Processing base64 data URL');
      try {
        const blob = base64ToBlob(imageUrl);
        const hash = generateHash();
        await putBlob(hash, blob);
        const result = `idb-ref:${hash}`;
        console.log('🖼️ Converted base64 to IndexedDB reference:', result);
        return result;
      } catch (e) {
        console.warn('Image persistence failed; keeping original base64 temporarily. Consider uploading to CDN.', e);
        return imageUrl;
      }
    }
    
    console.log('🖼️ Returning original URL (no processing needed):', imageUrl);
    return imageUrl;
  };

  // Resolve reference to an object URL (async)
  const resolveImageUrlAsync = async (reference: string): Promise<string> => {
    console.log('🖼️ Resolving image URL:', reference);
    
    if (!reference || typeof reference !== 'string') {
      console.log('🖼️ Invalid reference, returning placeholder');
      return '/placeholder.svg';
    }
    
    if (reference.startsWith('idb-ref:')) {
      const hash = reference.replace('idb-ref:', '');
      console.log('🖼️ Resolving IndexedDB reference:', hash);
      
      const existing = blobRegistry.get(hash);
      if (existing) {
        console.log('🖼️ Found existing blob URL:', existing);
        return existing;
      }
      
      const blob = await getBlob(hash);
      if (!blob) {
        console.log('🖼️ No blob found for hash, returning placeholder');
        return '/placeholder.svg';
      }
      
      const url = URL.createObjectURL(blob);
      blobRegistry.set(hash, url);
      console.log('🖼️ Created new blob URL:', url);
      return url;
    }
    
    if (reference.startsWith('blob-ref:')) {
      const hash = reference.replace('blob-ref:', '');
      const blobUrl = blobRegistry.get(hash);
      console.log('🖼️ Resolving blob reference:', hash, '->', blobUrl);
      return blobUrl || '/placeholder.svg';
    }
    
    console.log('🖼️ Returning direct reference:', reference);
    return reference;
  };

  const processImagesForPersistence = async (images: string[]): Promise<string[]> => {
    const results: string[] = [];
    for (const img of images || []) {
      results.push(await processImageForPersistence(img));
    }
    return results;
  };

  const resolveImageUrlsAsync = async (references: string[]): Promise<string[]> => {
    const results: string[] = [];
    for (const ref of references || []) {
      results.push(await resolveImageUrlAsync(ref));
    }
    return results;
  };

  return {
    // persistence
    processImageForPersistence,
    processImagesForPersistence,
    // resolution
    resolveImageUrlAsync,
    resolveImageUrlsAsync,
    // internal caches (useful for testing)
    blobRegistry,
  };
};

// Global instance
export const imageStorage = createImageStorageUtils();
