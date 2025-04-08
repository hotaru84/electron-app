import React, { useState } from 'react';
import { useElectron } from './useElectron';
import { parseHttpJson } from './util/parseHttpJson';

const App = () => {
  const { isElectron, addResponse } = useElectron();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file && isElectron && addResponse !== undefined) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const json = JSON.parse(e.target?.result as string);
        const { responses } = parseHttpJson(json);

        await addResponse(responses.map((r) => ({ ...r, method: 'PUT', path: 'api/cmd' })));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>アップロード</button>
    </div>
  );
};

export default App;
