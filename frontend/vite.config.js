import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    open: true,
    proxy: {
      // Proxy requests from /api to your backend server
      '/api': {
        target: 'http://localhost:5001', // CHANGED TO 5001
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false,      // Don't verify SSL certs
        // Add this to log proxy events
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Vite Proxy Error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
}) 