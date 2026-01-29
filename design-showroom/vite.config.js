import { defineConfig } from 'vite'

export default defineConfig({
  publicDir: '../ds/public', // Points to your shared assets
  server: {
    fs: {
      allow: ['..'] // Required for monorepos to access sibling folders
    }
  }
})