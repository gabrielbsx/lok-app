import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.wydimperial.com/v1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
      '/facebook': {
        target: 'https://connect.facebook.net',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/facebook/, ''),
      },
    },
  },
  plugins: [react(), imagetools()],
})
