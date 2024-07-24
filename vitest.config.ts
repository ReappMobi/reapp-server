import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['tests/helpers/setup.ts'],
    exclude: ['node_modules', 'dist', 'coverage', 'pg-data'],
  },
});
