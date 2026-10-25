import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Build de biblioteca: um JS (ESM) e um CSS com tokens + componentes.
// fonte.css, tokens.json e logos (src/publico) vão para dist como estão, sem passar pelo bundle.
export default defineConfig({
  plugins: [react()],
  publicDir: resolve(import.meta.dirname, 'src/publico'),
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'estilos',
    },
    cssCodeSplit: false,
    sourcemap: true,
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/],
    },
  },
});
