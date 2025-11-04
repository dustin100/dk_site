// html/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // serve from html/src
  build: {
    outDir: '../dist', // output to html/dist
    emptyOutDir: true,
  },
  server: {
    open: true, // auto-open http://localhost:5173/
  },
});
