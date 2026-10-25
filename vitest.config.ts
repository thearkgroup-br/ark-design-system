import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.{ts,mjs}'],
    css: false,
    coverage: {
      provider: 'v8',
      // Só código de produção: referencia/, vitrine, tipos e configs ficam fora da conta.
      include: ['src/**/*.{ts,tsx}', 'scripts/**/*.mjs'],
      exclude: ['**/*.test.{ts,tsx,mjs}', '**/*.d.ts', '**/*.d.mts', 'src/test/**'],
      reporter: ['text', 'html', 'json-summary'],
      thresholds: { lines: 80, functions: 80, branches: 80, perFile: true },
    },
  },
});
