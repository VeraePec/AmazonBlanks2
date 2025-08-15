#!/usr/bin/env node

/**
 * Cross-Browser Sync Server Startup Script
 * This script ensures the cross-browser sync server is always running
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const SERVER_FILE = 'cross-browser-sync-server.cjs';
const SERVER_PORT = 3001;

console.log('🚀 Starting Cross-Browser Sync Server...');

// Check if server file exists
if (!fs.existsSync(SERVER_FILE)) {
  console.error(`❌ Server file not found: ${SERVER_FILE}`);
  process.exit(1);
}

// Check if port is already in use
const net = require('net');
const server = net.createServer();

server.listen(SERVER_PORT, () => {
  server.close();
  console.log(`✅ Port ${SERVER_PORT} is available`);
  startServer();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️  Port ${SERVER_PORT} is already in use. Server might already be running.`);
    console.log('🔄 Attempting to start server anyway...');
    startServer();
  } else {
    console.error('❌ Port check failed:', err);
    process.exit(1);
  }
});

function startServer() {
  console.log(`📡 Starting cross-browser sync server on port ${SERVER_PORT}...`);
  
  const serverProcess = spawn('node', [SERVER_FILE], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  serverProcess.on('error', (err) => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  });

  serverProcess.on('exit', (code) => {
    if (code !== 0) {
      console.error(`❌ Server exited with code ${code}`);
      console.log('🔄 Restarting server in 5 seconds...');
      setTimeout(() => {
        startServer();
      }, 5000);
    }
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    serverProcess.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down server...');
    serverProcess.kill('SIGTERM');
    process.exit(0);
  });

  console.log('✅ Cross-browser sync server started successfully!');
  console.log(`🌐 Server running on: http://localhost:${SERVER_PORT}`);
  console.log('📡 Sync endpoints available:');
  console.log(`   POST /api/broadcast-sync - Broadcast events`);
  console.log(`   GET  /api/sync-events - Fetch events`);
  console.log(`   GET  /api/health - Health check`);
  console.log('\n💡 Keep this terminal open to maintain sync functionality');
  console.log('🔄 Server will automatically restart if it crashes');
}
