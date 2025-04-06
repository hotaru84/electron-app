import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use('/api/cmd/', async (req, res, next) => {
        if (req.method === 'PUT') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            console.log('Received mock command:', body);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
              message: 'Dummy response from mock server',
              status: 'success',
            }));
          });
        } else {
          next(); // 他の HTTP メソッドはスキップ
        }
      });
    }
  }
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
