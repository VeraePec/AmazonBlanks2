import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Wifi, WifiOff, CheckCircle, AlertCircle, Clock, Database, Server, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSyncStatus } from '../hooks/useCrossBrowserSync';
import { crossBrowserSync } from '../hooks/useCrossBrowserSync';
import { unifiedStorage } from '../utils/unifiedStorage';
import Header from '../components/Header';

export default function SyncTestPage() {
  const navigate = useNavigate();
  const syncStatus = useSyncStatus();
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunningTest, setIsRunningTest] = useState(false);

  const addTestResult = (type: 'info' | 'success' | 'warning' | 'error', message: string, details?: any) => {
    setTestResults(prev => [{
      id: Date.now(),
      type,
      message,
      details,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev.slice(0, 9)]); // Keep last 10 results
  };

  const runSyncTest = async () => {
    setIsRunningTest(true);
    setTestResults([]);
    
    addTestResult('info', 'Starting cross-browser sync test...');
    
    try {
      // Test 1: Check browser ID
      const browserId = crossBrowserSync.getBrowserId();
      addTestResult('success', `Browser ID: ${browserId}`);
      
      // Test 2: Check online status
      const isOnline = crossBrowserSync.isBrowserOnline();
      addTestResult(isOnline ? 'success' : 'warning', `Online Status: ${isOnline ? 'Online' : 'Offline'}`);
      
      // Test 3: Test local broadcast
      addTestResult('info', 'Testing local broadcast...');
      await crossBrowserSync.broadcastProductAdded('test-product-123', { test: true });
      addTestResult('success', 'Local broadcast successful');
      
      // Test 4: Test server broadcast
      addTestResult('info', 'Testing server broadcast...');
      try {
        await crossBrowserSync.broadcastProductUpdated('test-product-123', { test: true });
        addTestResult('success', 'Server broadcast successful');
      } catch (error) {
        addTestResult('warning', 'Server broadcast failed (may be offline)', error);
      }
      
      // Test 5: Force sync
      addTestResult('info', 'Testing force sync...');
      await crossBrowserSync.forceSync();
      addTestResult('success', 'Force sync successful');
      
      // Test 6: Check storage
      addTestResult('info', 'Checking storage status...');
      const products = await unifiedStorage.getAllProducts();
      addTestResult('success', `Storage contains ${products.length} products`);
      
      // Test 7: Test cross-browser event listener
      addTestResult('info', 'Testing event listener...');
      let eventReceived = false;
      const unsubscribe = crossBrowserSync.addListener('product-added', (event) => {
        eventReceived = true;
        addTestResult('success', 'Cross-browser event received!', event);
      });
      
      // Wait a bit for potential events
      await new Promise(resolve => setTimeout(resolve, 2000));
      unsubscribe();
      
      if (!eventReceived) {
        addTestResult('info', 'No cross-browser events received (normal if no other browsers)');
      }
      
    } catch (error) {
      addTestResult('error', 'Test failed', error);
    }
    
    setIsRunningTest(false);
    addTestResult('success', 'Cross-browser sync test completed!');
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </button>
            
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Cross-Browser Sync Test
            </h1>
          </div>
          
          <p className="text-gray-600 text-lg mb-6">
            Test the cross-browser synchronization functionality to ensure products are synced across all devices and browsers.
          </p>
          
          {/* Sync Status Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Browser ID</p>
                  <p className="text-lg font-bold text-gray-900 font-mono">
                    {crossBrowserSync.getBrowserId().slice(0, 12)}...
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  syncStatus.isOnline 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                    : 'bg-gradient-to-br from-red-500 to-pink-500'
                }`}>
                  {syncStatus.isOnline ? <Wifi className="w-5 h-5 text-white" /> : <WifiOff className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Connection</p>
                  <p className={`text-lg font-bold ${syncStatus.isOnline ? 'text-green-700' : 'text-red-700'}`}>
                    {syncStatus.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Last Sync</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(syncStatus.lastSync).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Test Controls */}
          <div className="flex gap-4">
            <button
              onClick={runSyncTest}
              disabled={isRunningTest}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isRunningTest ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <RefreshCw className="w-5 h-5" />
              )}
              {isRunningTest ? 'Running Test...' : 'Run Sync Test'}
            </button>
            
            <button
              onClick={() => setTestResults([])}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
            >
              Clear Results
            </button>
          </div>
        </div>
        
        {/* Test Results */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Test Results</h2>
          
          {testResults.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Database className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No test results yet</p>
              <p className="text-sm">Click "Run Sync Test" to start testing</p>
            </div>
          ) : (
            <div className="space-y-3">
              {testResults.map((result) => (
                <div
                  key={result.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${getStatusColor(result.type)}`}
                >
                  {getStatusIcon(result.type)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{result.message}</p>
                    {result.details && (
                      <details className="mt-2">
                        <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                          View Details
                        </summary>
                        <pre className="mt-2 text-xs text-gray-700 bg-white/50 p-2 rounded border overflow-x-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{result.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Instructions */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Test Cross-Browser Sync</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Open Multiple Browsers</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Open Chrome, Safari, Firefox, or Edge</li>
                <li>• Navigate to this page in each browser</li>
                <li>• Each browser will get a unique ID</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Run Tests</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Click "Run Sync Test" in each browser</li>
                <li>• Watch for cross-browser events</li>
                <li>• Check if products sync across browsers</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Create Products</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Use AI Product Builder in one browser</li>
                <li>• Check if products appear in other browsers</li>
                <li>• Verify real-time synchronization</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Monitor Status</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Watch the sync status indicators</li>
                <li>• Check for online/offline status</li>
                <li>• Monitor last sync timestamps</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
