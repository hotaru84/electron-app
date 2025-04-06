import express from "express";
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3000;

app.use(express.json());
app.put("/api/cmd/", (req, res) => {
  //console.log(req); // 受け取ったデータをログに出力
  res.json({ message: "Command received and processed:" + req.body });
});

const distPath = path.join(__dirname);
app.use(express.static(distPath));


app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
});
