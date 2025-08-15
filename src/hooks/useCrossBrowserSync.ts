import { useEffect, useCallback, useState } from 'react';
import { crossBrowserSync, type CrossBrowserSyncEvent } from '../utils/crossBrowserSync';
import { cloudSync, type CloudSyncEvent } from '../utils/cloudSync';

export function useCrossBrowserSync(
  eventType: CrossBrowserSyncEvent['type'],
  callback: (event: CrossBrowserSyncEvent) => void,
  dependencies: any[] = []
) {
  const memoizedCallback = useCallback(callback, dependencies);

  useEffect(() => {
    // Subscribe to both cross-browser sync and cloud sync
    const unsubscribeCrossBrowser = crossBrowserSync.addListener(eventType, memoizedCallback);
    
    // Map cross-browser events to cloud events
    const cloudEventType = eventType as CloudSyncEvent['type'];
    const unsubscribeCloud = cloudSync.addListener(cloudEventType, (cloudEvent) => {
      // Convert cloud event to cross-browser event format
      const crossBrowserEvent: CrossBrowserSyncEvent = {
        type: cloudEvent.type,
        productId: cloudEvent.productId,
        timestamp: cloudEvent.timestamp,
        browserId: cloudEvent.browserId,
        data: cloudEvent.data,
        source: 'server' // Mark as coming from cloud
      };
      memoizedCallback(crossBrowserEvent);
    });
    
    return () => {
      unsubscribeCrossBrowser();
      unsubscribeCloud();
    };
  }, [eventType, memoizedCallback]);
}

export function useProductSync(callback: (event: CrossBrowserSyncEvent) => void, dependencies: any[] = []) {
  const memoizedCallback = useCallback(callback, dependencies);

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    // Listen for all product-related events
    ['product-added', 'product-updated', 'product-deleted'].forEach(eventType => {
      const unsubscribe = crossBrowserSync.addListener(eventType as CrossBrowserSyncEvent['type'], memoizedCallback);
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [memoizedCallback]);
}

export function useSyncStatus() {
  const [syncStatus, setSyncStatus] = useState(() => ({
    ...crossBrowserSync.getSyncStatus(),
    ...cloudSync.getSyncStatus()
  }));

  useEffect(() => {
    const updateStatus = () => {
      setSyncStatus({
        ...crossBrowserSync.getSyncStatus(),
        ...cloudSync.getSyncStatus()
      });
    };

    // Update status every 5 seconds
    const interval = setInterval(updateStatus, 5000);

    // Also update on sync events
    const unsubscribeCrossBrowser = crossBrowserSync.addListener('storage-sync', updateStatus);
    const unsubscribeCloud = cloudSync.addListener('force-sync', updateStatus);

    return () => {
      clearInterval(interval);
      unsubscribeCrossBrowser();
      unsubscribeCloud();
    };
  }, []);

  return syncStatus;
}

export { crossBrowserSync };
