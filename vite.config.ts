import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          framer: ['framer-motion'],
          ui: ['react-hot-toast']
        }
      }
    },
    commonjsOptions: {
      esmExternals: true
    },
    emptyOutDir: true
  },
  preview: {
    port: 3000,
    strictPort: true
  }
})
