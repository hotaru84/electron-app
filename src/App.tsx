import React, { useState } from 'react';
import { useElectron } from './useElectron';

const App = () => {
  const { isElectron, parsePcap } = useElectron();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ requests: unknown[], responses: unknown[] } | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    console.log(isElectron, parsePcap)
    if (file && isElectron && parsePcap !== undefined) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileBuffer = e.target?.result as ArrayBuffer;
        console.log("s p");
        const result = await parsePcap(fileBuffer);
        console.log("e", result);
        setResult(result);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>アップロード</button>

      {result && (
        <div>
          <h3>Requests</h3>
          <pre>{JSON.stringify(result.requests, null, 2)}</pre>

          <h3>Responses</h3>
          <pre>{JSON.stringify(result.responses, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
