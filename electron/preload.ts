import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('apiConfig', {
});
