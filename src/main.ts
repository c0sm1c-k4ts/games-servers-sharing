import { app, BrowserWindow } from "electron";
import path from "path";
import { WebViewServer } from "./express";

if (require("electron-squirrel-startup")) {
  app.quit();
}

class ElectronApp {
  public mainWindow: BrowserWindow;
  public webViewServer: WebViewServer | null;

  static init() {
    const electronApp = new ElectronApp();

    app.on("ready", electronApp.prepare);
    app.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    });
    app.on("activate", () => {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        electronApp.prepare();
      }
    });
  }

  private prepare = () => {
    this.createWindow();

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      this.loadDevVersion();
    } else {
      this.loadProdVersion();
    }

    // Open the DevTools by default
    // mainWindow.webContents.openDevTools();
  };

  private loadProdVersion = () => {
    this.mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
    this.setWebViewServer();
    this.sendPortInfo();
  };

  private loadDevVersion = () => {
    this.mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  };

  private setWebViewServer = () => {
    this.webViewServer = WebViewServer.setup();
  };

  private createWindow = () => {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.mainWindow.maximize();
  };

  private sendPortInfo = () => {
    const { mainWindow, webViewServer } = this;

    mainWindow.on("ready-to-show", () => {
      mainWindow.show();

      mainWindow.webContents.send(
        "webViewPort",
        webViewServer.addressInfo.getServerAddress(),
      );
    });
  };
}

ElectronApp.init();
