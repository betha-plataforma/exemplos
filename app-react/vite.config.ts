import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      '@betha-plataforma/estrutura-componentes',
      '@betha-plataforma/estrutura-componentes/loader',
      '@betha-plataforma/estrutura-componentes/loader/index.es2017.mjs',
    ],
  },
})
