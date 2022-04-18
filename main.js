const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const getTile = require("./getTile");

const loadMainWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("get-tile", getTile);

  // mainWindow.webContents.openDevTools();

  mainWindow.loadFile(path.join(__dirname, "index.html"));
};

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    loadMainWindow();
  }
});
