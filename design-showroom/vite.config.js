import { defineConfig } from 'vite'

export default defineConfig({
  // Use an empty string or './' to ensure all links are relative
  base: '', 
  publicDir: '../ds/public',
  build: {
    // This ensures Vite handles the subfolder structure correctly
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    fs: {
      allow: ['..'] 
    }
  }
})
