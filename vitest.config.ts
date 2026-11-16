import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    include: ['tests/**/*.spec.ts', 'tests/**/*.e2e-spec.ts'],
    coverage: {
      provider: 'v8',
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
      exclude: [
        'src/server.ts',
        'src/app.ts',
        'src/routes/**',
        'src/config/**',
        'src/models/**',
        'src/repositories/**/*.ts', // Interfaces e contratos de repositório
        '**/*.d.ts',
        'vitest.config.ts',
        'k6/**',
        'src/utils/*.ts',
        'tests/**',
        'src/middlewares/**'
      ],
    }
  },
})