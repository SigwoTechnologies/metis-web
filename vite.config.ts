import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [eslintPlugin(), react()],
  resolve: {
    alias: {
      '@metis': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
