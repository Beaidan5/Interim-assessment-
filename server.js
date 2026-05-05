// Root server.js — Entry point for Render deployment
// Installs and starts the backend server

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const backendDir = path.join(__dirname, 'backend');
const backendNodeModules = path.join(backendDir, 'node_modules');

// Install backend dependencies if needed
if (!fs.existsSync(backendNodeModules)) {
  console.log('📦 Installing backend dependencies...');
  try {
    execSync('npm install', { cwd: backendDir, stdio: 'inherit' });
    console.log('✅ Backend dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install backend dependencies:', error.message);
    process.exit(1);
  }
}

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Start the backend server directly
console.log('🚀 Starting backend server...');
require('./backend/server.js');
