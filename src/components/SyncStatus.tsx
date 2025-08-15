import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useSyncStatus } from '../hooks/useCrossBrowserSync';

interface SyncStatusProps {
  className?: string;
}

export default function SyncStatus({ className = '' }: SyncStatusProps) {
  const syncStatus = useSyncStatus();

  const getStatusIcon = () => {
    if (!syncStatus.isOnline) {
      return <WifiOff className="w-4 h-4 text-red-500" />;
    }
    
    const timeSinceLastSync = Date.now() - syncStatus.lastSync;
    if (timeSinceLastSync < 30000) { // Less than 30 seconds
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (timeSinceLastSync < 60000) { // Less than 1 minute
      return <Clock className="w-4 h-4 text-yellow-500" />;
    } else {
      return <AlertCircle className="w-4 h-4 text-orange-500" />;
    }
  };

  const getStatusText = () => {
    if (!syncStatus.isOnline) {
      return 'Offline';
    }
    
    const timeSinceLastSync = Date.now() - syncStatus.lastSync;
    if (timeSinceLastSync < 30000) {
      return 'Synced';
    } else if (timeSinceLastSync < 60000) {
      return 'Syncing...';
    } else {
      return 'Sync needed';
    }
  };

  const getStatusColor = () => {
    if (!syncStatus.isOnline) {
      return 'text-red-600 bg-red-50 border-red-200';
    }
    
    const timeSinceLastSync = Date.now() - syncStatus.lastSync;
    if (timeSinceLastSync < 30000) {
      return 'text-green-600 bg-green-50 border-green-200';
    } else if (timeSinceLastSync < 60000) {
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    } else {
      return 'text-orange-600 bg-orange-50 border-orange-200';
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 1000) return 'Just now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${getStatusColor()} ${className}`}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
      
      {syncStatus.isOnline && (
        <div className="flex items-center gap-1 text-xs opacity-75">
          <span>•</span>
          <span>{formatTimeAgo(syncStatus.lastSync)}</span>
        </div>
      )}
      
      {syncStatus.isOnline && (
        <button
          onClick={() => {
            // Trigger a manual sync
            window.dispatchEvent(new Event('unified-storage-hydrated'));
          }}
          className="ml-2 p-1 hover:bg-white/20 rounded transition-colors"
          title="Force sync"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
