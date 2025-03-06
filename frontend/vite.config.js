import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // 允许外部访问
    port: 3001,       // 指定端口
    strictPort: true, // 如果端口被占用，则会直接退出
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})