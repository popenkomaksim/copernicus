const path = require("path");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();

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

const getSqliteFileName = ({ vendor, z, x, y }) => {
  let result = `/../maps/${vendor}/`;
  if (z <= 10) {
    result += "5_9.sqlite";
  } else {
    const needed = tileCoordsScaleDown(z, x, y, 10);
    result += `10_${needed.x}_${needed.y}.sqlite`;
  }
  console.log(path.join(__dirname, result));
  return path.join(__dirname, result);
};

app.get("/:vendor/:z/:x/:y", async (req, res) => {
  const { vendor, z, x, y } = req.params;
  const db = new sqlite3.Database(
    getSqliteFileName({ vendor, z, x, y }),
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.log(err);
        res.sendFile(path.join(__dirname, "/transparent_256x256.png"));
      }
    }
  );

  db.on("trace", (a) => console.log(a));

  db.all(
    `SELECT z, x, y, data, ext FROM "tiles" WHERE ("z" = "${z}") AND ("x" = "${x}") AND ("y" = "${y}");`,
    function (err, rows) {
      let found = false;
      rows.forEach(function (row) {
        found = true;
        res.send(Buffer.from(row.data));
      });

      if (!found) {
        res.sendFile(path.join(__dirname, "/transparent_256x256.png"));
      }
    }
  );

  db.close();
});

module.exports = app;
