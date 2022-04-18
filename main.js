const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const util = require("util");
const fs = require("fs");
const getTile = require("./getTile");

const writeFile = util.promisify(fs.writeFile);

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

  mainWindow.webContents.openDevTools();

  // const port = "34567";
  // await writeFile("port.js", `window.port=${port};`);

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // global.port = port;

  // webServer.listen(port, () => {
  //   console.log(`Example app listening on port ${port}`);
  // });
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
