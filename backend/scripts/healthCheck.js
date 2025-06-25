
const fetch = require('node-fetch');

const API_URL = process.env.API_URL || 'http://localhost:5000';

async function healthCheck() {
  try {
    console.log('🔍 Performing health check...');
    
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    
    if (response.ok && data.status === 'OK') {
      console.log('✅ Health check passed');
      console.log(`📊 Database: ${data.database}`);
      console.log(`⏱️  Uptime: ${Math.round(data.uptime)}s`);
      console.log(`💾 Memory: ${data.memory.used}/${data.memory.total}`);
    } else {
      console.log('❌ Health check failed');
      console.log(data);
    }
  } catch (error) {
    console.log('❌ Health check error:', error.message);
  }
}

healthCheck();
