import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true, // Ensures the public/ folder is copied to dist
  },
});
