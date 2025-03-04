import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',  // 允许外部访问
    port: 3001,       // 指定端口
    strictPort: true, // 如果端口被占用，则会直接退出
  }
})
