const path = require("path");
const fs = require("fs");
const util = require("util");
const sqlite3 = require("sqlite3").verbose();

const readFile = util.promisify(fs.readFile);

function tileCoordsScaleDown(x, y, z, nz) {
  if (nz > z) {
    throw "new zoom must be lower than current";
  }
  var scale = 1 << (z - nz);
  return {
    x: Math.floor(x / scale),
    y: Math.floor(y / scale),
  };
}

const getSqliteFileName = ({ provider, z, x, y }) => {
  let result = `/../maps/${provider}/`;
  // if (true) {
  if (z <= 10) {
    result += "5_9.sqlite";
  } else {
    const needed = tileCoordsScaleDown(z, x, y, 10);
    result += `10_${needed.x}_${needed.y}.sqlite`;
  }
  console.log(path.join(__dirname, result));
  return path.join(__dirname, result);
};

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
const getTile = (channel, listener) => {
  const { provider, z, x, y } = listener || {};
  return new Promise(async (resolve, reject) => {
    const db = new sqlite3.Database(
      getSqliteFileName({ provider, z, x, y }),
      sqlite3.OPEN_READONLY,
      async (err) => {
        if (err) {
          console.log(err);
          let buff = await readFile(
            path.join(__dirname, "/transparent_256x256.png")
          );
          let base64data = "data:image/png;base64, " + buff.toString("base64");

          resolve(base64data);
        }
      }
    );

    db.on("trace", (event) => console.log(event));

    db.all(
      `SELECT z, x, y, data, ext FROM "tiles" WHERE ("z" = "${z}") AND ("x" = "${x}") AND ("y" = "${y}");`,
      // `SELECT z, x, y, data, ext FROM "tiles");`,
      async function (err, rows) {
        let found = false;
        console.log(rows);
        if (rows) {
          rows.forEach(function (row) {
            found = true;
            // res.send(Buffer.from(row.data));
            resolve(row.data);
          });
        }


        if (!found) {
          let buff = await readFile(
            path.join(__dirname, "/transparent_256x256.png")
          );
          let base64data = "data:image/png;base64, " + buff.toString("base64");

          resolve(base64data);
        }
      }
    );

    db.close();
  });
};
module.exports = getTile;
