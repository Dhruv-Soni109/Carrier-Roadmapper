import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('\n====================================================');
console.log('🚀 Starting PathForge Full-Stack Platform...');
console.log('📡 Frontend (Vite):   http://localhost:5173');
console.log('🤖 Backend (Express): http://localhost:8787');
console.log('🌐 Combined Port:     http://localhost:8787 (API + App)');
console.log('====================================================\n');

// 1. Start Express Backend
const backend = spawn('node', ['src/index.js'], {
  cwd: path.join(rootDir, 'server'),
  stdio: 'inherit',
  shell: true,
});

// 2. Start Vite Frontend
const frontend = spawn('npx', ['vite'], {
  cwd: rootDir,
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  console.log('\n[PathForge] Shutting down full-stack processes...');
  backend.kill();
  frontend.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
