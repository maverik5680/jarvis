import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Simple single-package setup.
  // We serve a small app from repo root.
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@ds': path.resolve(__dirname, 'ds/src/css'),
    },
  },
});
