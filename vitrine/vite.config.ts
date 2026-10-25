import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Vitrine local: `npm run vitrine`. Usa o código de src direto, sem build.
export default defineConfig({
  root: import.meta.dirname,
  plugins: [react()],
  server: { port: 5180 },
});
