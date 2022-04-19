const path = require("path");
const log = require("electron-log");


// CODE BELOW IS UNREACHABLE
// On my mac log saved in following path
// /Users/max/Library/Logs/Карти
log.transports.file.resolvePath = () => {
    console.log(path.join(__dirname, "/_logsmain.log"));
    return path.join(__dirname, "/_logsmain.log");
};
log.transports.file.resolvePath = () => {
  console.log(path.join(__dirname, "_logsmain.log"));
  return path.join(__dirname, "_logsmain.log");
};
log.transports.file.level = "info";

exports.log = (entry) => log.info(entry);
