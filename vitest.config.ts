import path from 'path';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    exclude: ['node_modules', 'dist', 'coverage', 'pg-data'],
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app.ts'),
      '@api': path.resolve(__dirname, './src/api/'),
      '@config': path.resolve(__dirname, './src/config'),
      '@components': path.resolve(__dirname, './src/api/components/'),
      '@services': path.resolve(__dirname, './src/services/'),
    },
  },
});
