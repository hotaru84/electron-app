import express from "express";
import path from 'path';

import { fileURLToPath } from 'url';
import { HttpResponse } from "./httpjson";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000

export function startMockServer(method: string, urlpath: string, response: HttpResponse) {
  const app = express();
  app.use(express.json());

  const status = parseInt(response.statusCode, 10) || 200;
  const headers = response.headers || { "Content-Type": "application/json" };
  const body = response.body ? JSON.parse(response.body) : {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (app as any)[method](urlpath, (req, res) => {
    console.log("Incoming request body:", req.body);

    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value as string);
    }

    res.status(status).send(body);
  });

  const distPath = path.join(__dirname);
  app.use(express.static(distPath));


  app.listen(PORT, () => {
    console.log(`Local API server running on http://localhost:${PORT}`);
  });
}
