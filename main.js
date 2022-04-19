const electron = require("electron");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const getTile = require("./getTile");
const logger = require("electron-log");

const findCopernicusMapsFolderPath = (current) => {
  logger.info(current);
  const dirPath = path.join(current, "/", global.COPERNICUS_MAPS_DIRNAME);
  if (fs.existsSync(dirPath) && fs.lstatSync(dirPath).isDirectory()) {
    logger.info("FOUND");
    logger.info(dirPath);
    return dirPath;
  } else if (current.length) {
    return findCopernicusMapsFolderPath(path.join(current, ".."));
  }
  electron.dialog.showErrorBox("Error", `"${aa}" папку не знайдено у директоріях вище за ту де запускається програма.`);
  throw new Error("no maps found");
}

global.COPERNICUS_MAPS_DIRNAME = "copernicus-maps";
global.COPERNICUS_MAPS_PATH = findCopernicusMapsFolderPath(__dirname);

app.setPath(
  "userData",
  path.join(global.COPERNICUS_MAPS_PATH, "../preferences/")
);


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
  try {
    //  let result = `/../maps/OSM/`;

    //  let files = "";
    //  fs.readdirSync(path.join(__dirname, result)).forEach((file) => {
    //    files += file + "          /n";
    //  });
    //  console.log(files);

    //  electron.dialog.showErrorBox("Title", __dirname);
    //  electron.dialog.showErrorBox("Title", path.dirname(require("electron").app.getPath("exe")));
    } catch (err) {
      console.log(err)
      logger.info(err);
    }

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
