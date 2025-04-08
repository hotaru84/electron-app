import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { ChildProcess, fork } from "child_process";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;
let apiProcess: ChildProcess | null = null;

console.log(app.getAppPath())

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), 'dist-electron', 'preload.js')
    }
  });

  startApiServer();

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadURL('http://localhost:3000');
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (apiProcess) apiProcess.kill();
});

// IPC通信でファイル解析をメインプロセス側で行う
ipcMain.handle('addResponse', async (_, responses: Response[]) => {
  // PCAPファイル解析
  //const result = await parsePcap(fileBuffer);
  //return result;
});

function startApiServer() {
  apiProcess = fork(path.join(__dirname, "apiServer.js"), [], {
    env: { ...process.env, DEBUG: undefined },
    stdio: "inherit",
  });
}
