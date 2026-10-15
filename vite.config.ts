import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The manifest lets scripts/prerender.mjs preload each page's own chunk.
  // Logos and avatars load as cacheable files instead of base64 inside the JS.
  build: { manifest: true, assetsInlineLimit: 0 },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
