// jarvis/design-showroom/vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  // This allows Vite to see your CSS in the ../ds/ folder
  server: {
    fs: {
      allow: ['..']
    }
  },
  // This tells Vite where your shared images/assets are
  publicDir: '../ds/public'
})