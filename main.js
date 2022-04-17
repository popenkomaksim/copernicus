const { app, BrowserWindow } = require("electron");
const path = require("path");
const webServer = require("./web-server");

const loadMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  const port = 3000;
  webServer.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
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
