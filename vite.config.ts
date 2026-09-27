import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build works at any GitHub Pages path (e.g. /<repo>/).
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2500,
    rolldownOptions: {
      output: {
        // Question content and vendor code change at different rates; split them for better caching.
        advancedChunks: {
          groups: [
            { name: 'content', test: /src[\\/]data[\\/]raw/ },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
  },
})
