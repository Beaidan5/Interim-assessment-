// Root server.js — Entry point for Render deployment
// This installs backend dependencies and starts the server

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ensure we have node_modules in backend
const backendDir = path.join(__dirname, 'backend');
const backendNodeModules = path.join(backendDir, 'node_modules');

if (!fs.existsSync(backendNodeModules)) {
  console.log('Installing backend dependencies...');
  try {
    execSync('npm install', { cwd: backendDir, stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to install backend dependencies:', error.message);
    process.exit(1);
  }
}

require('dotenv').config();

// Start the backend server
require('./backend/server.js');
