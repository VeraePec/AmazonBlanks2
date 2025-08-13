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
    if (!imageUrl || typeof imageUrl !== 'string') return '/placeholder.svg';
    // Handle blob: object URLs by fetching and storing the blob
    if (imageUrl.startsWith('blob:')) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const hash = generateHash();
        await putBlob(hash, blob);
        return `idb-ref:${hash}`;
      } catch (e) {
        console.warn('Failed to persist blob URL, keeping as-is', e);
        return imageUrl;
      }
    }
    if (!imageUrl.startsWith('data:')) {
      return imageUrl; // keep regular URLs
    }
    try {
      const blob = base64ToBlob(imageUrl);
      const hash = generateHash();
      await putBlob(hash, blob);
      return `idb-ref:${hash}`;
    } catch (e) {
      console.warn('Image persistence failed; keeping original base64 temporarily. Consider uploading to CDN.', e);
      return imageUrl;
    }
  };

  // Resolve reference to an object URL (async)
  const resolveImageUrlAsync = async (reference: string): Promise<string> => {
    if (!reference || typeof reference !== 'string') return '/placeholder.svg';
    if (reference.startsWith('idb-ref:')) {
      const hash = reference.replace('idb-ref:', '');
      const existing = blobRegistry.get(hash);
      if (existing) return existing;
      const blob = await getBlob(hash);
      if (!blob) return '/placeholder.svg';
      const url = URL.createObjectURL(blob);
      blobRegistry.set(hash, url);
      return url;
    }
    if (reference.startsWith('blob-ref:')) {
      const hash = reference.replace('blob-ref:', '');
      const blobUrl = blobRegistry.get(hash);
      return blobUrl || '/placeholder.svg';
    }
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
