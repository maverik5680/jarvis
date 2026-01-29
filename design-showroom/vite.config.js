import { defineConfig } from 'vite'

export default defineConfig({
  // Tell Vite your images/assets are in the sibling folder
  publicDir: '../ds/public', 
  server: {
    fs: {
      // Allow Vite to grab CSS/files from the sibling 'ds' folder
      allow: ['..'] 
    }
  }
})