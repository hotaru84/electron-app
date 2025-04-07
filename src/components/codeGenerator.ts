type RequestJson = {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
};

type ResponseJson = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
};

// JSON → TypeScriptコード生成
export function generateRequestCode(request: RequestJson): string {
  return `
import axios from 'axios';

export async function sendRequest() {
  const response = await axios.${request.method.toLowerCase()}('${request.url}', {
    headers: ${JSON.stringify(request.headers, null, 2)},
    data: ${JSON.stringify(request.body, null, 2)},
  });

  console.log(response.data);
}
  `;
}

export function generateResponseCode(response: ResponseJson): string {
  return `
import express from 'express';
const app = express();

app.use(express.json());

app.post('${response.url}', (req, res) => {
  res.status(${response.statusCode}).json(${JSON.stringify(response.body, null, 2)});
});

app.listen(3000, () => {
  console.log('Server running');
});
  `;
}
