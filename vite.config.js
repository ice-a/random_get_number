import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    entries: ['./src/main.js']
  },
  build: {
    rollupOptions: {
      input: './src/main.js'
    },
    outDir: 'dist',
  }
})