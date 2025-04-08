import { Response } from "./httpjson";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('apiConfig', {
});

contextBridge.exposeInMainWorld('electron', {
  isElectron: true,
  addResponse: (responses: Response[]) => ipcRenderer.invoke('addResponse', responses),
});

