// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

// TODO: channels should be listed somewhere else
contextBridge.exposeInMainWorld("electronAPI", {
  getWebViewAddress: (callback: (address: string) => void) =>
    ipcRenderer.on("webViewPort", (_, address: string) => callback(address)),
});
