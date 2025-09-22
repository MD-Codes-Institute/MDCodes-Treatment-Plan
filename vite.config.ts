/// <reference types="vitest" />
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',                // ✅ gera ./assets/... no index.html
  build: { outDir: 'dist' }, // ✅ garante pasta final
  plugins: [react(), legacy()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
