import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './', 
  publicDir: '../ds/public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        colors: resolve(__dirname, 'colors.html'),
        buttons: resolve(__dirname, 'buttons.html'),
        // ADD EVERY OTHER HTML FILE HERE LIKE THIS:
        // typography: resolve(__dirname, 'typography.html'),
      }
    }
  },
  server: {
    fs: {
      allow: ['..'] 
    }
  }
})
