// eslint-disable-next-line @typescript-eslint/no-require-imports
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('apiConfig', {
});

contextBridge.exposeInMainWorld('electron', {
  isElectron: true,
  parsePcap: (fileBuffer: ArrayBuffer) => ipcRenderer.invoke('parsePcap', fileBuffer),
});

