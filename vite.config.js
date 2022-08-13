import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      Components: path.resolve(__dirname, './src/components')
    }
  },
  server: {
    port: 3000
  }
})