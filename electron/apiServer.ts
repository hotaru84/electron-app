import express from "express";
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const exp = express();
const PORT = 3000;

exp.use(express.json());
exp.put("/api/cmd/", (req, res) => {
  res.json({ ...req.body, time: new Date().toISOString() });
});

const distPath = path.join(__dirname);
exp.use(express.static(distPath));


exp.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});
