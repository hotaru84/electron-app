import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api/cmd': {
        target: 'http://localhost:3000', // バックエンド API サーバーの URL（実際にバックエンドを接続する時に変更）
        changeOrigin: true,              // オリジンを変更
      },
    },
  },
})
