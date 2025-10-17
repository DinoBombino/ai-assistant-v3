import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist', // Убедись, что это совпадает с vercel.json
    emptyOutDir: true, // Очищает dist перед сборкой
    rollupOptions: {
      input: '/index.html' // Указываем точку входа
    }
  },
  server: {
    port: 5173
  }
})