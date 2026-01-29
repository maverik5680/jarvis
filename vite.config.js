import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: 'design-showroom',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            '@ds': path.resolve(__dirname, 'ds/src/css')
        }
    }
});
