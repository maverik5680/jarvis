import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    root: './',
    resolve: {
        alias: {
            '@ds': path.resolve(__dirname, '../DS/src/css')
        }
    }
});
