import { useEffect, useState } from 'react';
import { imageStorage } from '../utils/imageStorage';

export function useResolvedImage(source?: string): string {
  // If the source is an IndexedDB/blob reference, start with a safe placeholder
  const shouldDefer = typeof source === 'string' && (source.startsWith('idb-ref:') || source.startsWith('blob-ref:'));
  const initial = shouldDefer ? '/placeholder.svg' : (source || '/placeholder.svg');
  const [resolved, setResolved] = useState<string>(initial);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const input = source || '/placeholder.svg';

        if (typeof input === 'string' && (input.startsWith('idb-ref:') || input.startsWith('blob-ref:'))) {
          const url = await imageStorage.resolveImageUrlAsync(input);
          if (!cancelled) setResolved(url || '/placeholder.svg');
        } else {
          if (!cancelled) setResolved(input);
        }
      } catch (error) {
        if (!cancelled) setResolved('/placeholder.svg');
      }
    };
    run();
    return () => { cancelled = true; };
  }, [source]);

  return resolved;
}


