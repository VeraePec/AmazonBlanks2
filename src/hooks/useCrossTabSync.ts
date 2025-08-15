import { useEffect, useCallback } from 'react';
import { crossTabSync, type SyncEvent } from '../utils/crossTabSync';

export function useCrossTabSync(
  eventType: SyncEvent['type'],
  callback: (event: SyncEvent) => void,
  dependencies: any[] = []
) {
  const memoizedCallback = useCallback(callback, dependencies);

  useEffect(() => {
    const unsubscribe = crossTabSync.addListener(eventType, memoizedCallback);
    
    return () => {
      unsubscribe();
    };
  }, [eventType, memoizedCallback]);
}

export function useProductSync(callback: (event: SyncEvent) => void, dependencies: any[] = []) {
  const memoizedCallback = useCallback(callback, dependencies);

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    // Listen for all product-related events
    ['product-added', 'product-updated', 'product-deleted'].forEach(eventType => {
      const unsubscribe = crossTabSync.addListener(eventType as SyncEvent['type'], memoizedCallback);
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [memoizedCallback]);
}

export { crossTabSync };
