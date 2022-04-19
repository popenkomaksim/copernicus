const electron = require("electron");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
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
  // try {
  //    let result = `/../maps/OSM/`;

  //    let files = "";
  //    fs.readdirSync(path.join(__dirname, result)).forEach((file) => {
  //      files += file + "          /n";
  //    });
  //    console.log(files);

  //    electron.dialog.showErrorBox("Title", files);
  //   } catch (err) {
  //     console.log(err)
  //   }

  mainWindow.webContents.openDevTools();

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
