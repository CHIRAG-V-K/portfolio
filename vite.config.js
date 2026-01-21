import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    // Optimize build output

    // Chunk optimization
    rollupOptions: {
      output: {
        manualChunks: {
          'three-libs': ['three', '@react-three/fiber', '@react-three/drei', 'three-stdlib'],
          'ui': ['react-router-dom', 'react-toastify', 'framer-motion'],
        },
      },
    },
    // Target modern browsers for better optimization
    target: 'es2020',
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
})
