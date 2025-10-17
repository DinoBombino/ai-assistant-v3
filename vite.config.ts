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

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'https://n8n.namelomax.beget.tech',
//         changeOrigin: true,
//         secure: true,
//         rewrite: (path) => path.replace(/^\/api\/chat/, '/webhook-test/api/chat')
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     emptyOutDir: true
//   }
// })