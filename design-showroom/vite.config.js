import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// This little script finds all your .html files so you don't have to type them
const rootFiles = readdirSync(__dirname).filter(file => file.endsWith('.html'))
const input = {}
rootFiles.forEach(file => {
  const name = file.replace('.html', '')
  input[name] = resolve(__dirname, file)
})

export default defineConfig({
  base: './',
  publicDir: '../ds/public',
  build: {
    rollupOptions: {
      input: input // This now contains every .html file in your folder
    }
  },
  server: {
    fs: {
      allow: ['..'] 
    }
  }
})
