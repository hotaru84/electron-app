import { app, BrowserWindow } from "electron";
import path from "path";
import { ChildProcess, fork } from "child_process";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null = null;
let apiProcess: ChildProcess | null = null;

app.whenReady().then(() => {
  const distPath = path.join(__dirname, '');
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(distPath, 'preload.js')
    }
  });

  startApiServer();

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
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

function startApiServer() {
  apiProcess = fork(path.join(__dirname, "apiServer.js"), [], {
    env: { ...process.env, DEBUG: undefined },
    stdio: "inherit",
  });
}
