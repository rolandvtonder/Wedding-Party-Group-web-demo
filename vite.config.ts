import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig({
  // '/' for a domain root; the GitHub Pages workflow sets '/<repo>/'.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
  build: {
    // Photos and the rental catalogue live in public/ and are served as-is.
    target: 'es2020',
  },
});
