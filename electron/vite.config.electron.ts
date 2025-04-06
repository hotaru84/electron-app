import { defineConfig } from "vite";
import electron from "vite-plugin-electron";
import path from "path";
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    electron([
      {
        entry: path.resolve(__dirname, "main.ts"),
      },
      {
        entry: path.resolve(__dirname, "apiServer.ts"),
      },
      {
        entry: path.resolve(__dirname, "preload.ts"),
      },
    ]),
    react()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',  // API サーバーへのリクエストをローカル API サーバーにプロキシ
    },
  },
  build: {
    outDir: "dist-electron",  // 出力先を dist-electron に設定
    emptyOutDir: true,         // ビルド時に出力フォルダを空にする
  },

});
