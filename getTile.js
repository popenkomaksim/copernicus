const path = require("path");
const fs = require("fs");
const util = require("util");
const sqlite3 = require("sqlite3").verbose();

const readFile = util.promisify(fs.readFile);

function tileCoordsScaleDown({ x, y, z, nz }) {
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
  console.log({ provider, z, x, y });
  let result = `/../maps/${provider}/`;
  // if (true) {
  debugger;

  if ((z - 0) < 10) {
    result += "0_9.sqlite";
  } else {
    const scaledTo10 = tileCoordsScaleDown({ z, x, y, nz:10 });
    console.log({ scaledTo10 });
    result += `10_${scaledTo10.x}_${scaledTo10.y}.sqlite`;
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
  console.log("==================");
  const { provider, z, x, y } = listener || {};
  return new Promise(async (resolve, reject) => {
    const db = new sqlite3.Database(
      getSqliteFileName({ provider, z, x, y }),
      sqlite3.OPEN_READONLY,
      async (err) => {
        if (err) {
          console.trace(err);
          console.error(err);
          resolve(null);
        }
        db.on("trace", (event) => {
          console.trace(event);
          console.error(event);
        });

        db.all(
          `SELECT z, x, y, data, ext FROM "tiles" WHERE z = ${z} AND x = ${x} AND y = ${y};`,
          async function (err, rows) {
            let found = false;
            console.log(rows);
            if (rows) {
              rows.forEach(function (row) {
                found = true;
                resolve(
                  "data:image/png;base64, " +
                    Buffer.from(row.data).toString("base64")
                );
              });
            }
            if (!found) {
              resolve(null);
            }
            db.close();
            console.log("==================");
          }
        );
      }
    );
  });
};
module.exports = getTile;
