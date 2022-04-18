const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getTile: ({ provider, z, x, y }) =>
    ipcRenderer.invoke("get-tile", { provider, z, x, y }),
});
