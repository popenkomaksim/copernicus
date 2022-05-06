const emptyGif =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const config = {
  layers: [
    {
      local: true,
      id: "OSM-OFFLINE",
      projection: "EPSG:3857",
      source: new ol.source.XYZ({
        tileLoadFunction: async (imageTile, link) => {
          const [provider, z, x, y] = link.split("/");

          console.log("const [provider, z, x, y] = link.split();");
          console.log({ provider, z, x, y });

          const img = await window.electron.getTile({ provider, z, x, y });
          console.log(img);
          if (!img) {
            // * Indicates that tile loading failed
            // Proper code is imageTile.setState(ol.TileState.ERROR);
            // However I have issues to import ol.TileState.ERROR
            // On the other hand typeof ol.TileState.ERROR is number and it's equals 3
            imageTile.getImage().src = 3;
          } else {
            imageTile.getImage().src = img;
          }
        },
        url: `OSM/{z}/{x}/{y}`,
      }),
      displayName: "OSM",
      visible: true,
    },
    {
      local: true,
      id: "COSM-OFFLINE",
      projection: "EPSG:3857",
      source: new ol.source.XYZ({
        tileLoadFunction: async (imageTile, link) => {
          const [provider, z, x, y] = link.split("/");
          const img = await window.electron.getTile({ provider, z, x, y });
          if (!img) {
            // * Indicates that tile loading failed
            // Proper code is imageTile.setState(ol.TileState.ERROR);
            // However I have issues to import ol.TileState.ERROR
            // On the other hand typeof ol.TileState.ERROR is number and it's equals 3
            imageTile.getImage().src = 3;
          } else {
            imageTile.getImage().src = img;
          }
        },
        url: `COSM/{z}/{x}/{y}`,
      }),
      displayName: "COSM",
      visible: false,
    },
    {
      local: true,
      id: "GOOGLE-OFFLINE",
      projection: "EPSG:3857",
      source: new ol.source.XYZ({
        tileLoadFunction: async (imageTile, link) => {
          const [provider, z, x, y] = link.split("/");
          const img = await window.electron.getTile({ provider, z, x, y });
          if (!img) {
            // * Indicates that tile loading failed
            // Proper code is imageTile.setState(ol.TileState.ERROR);
            // However I have issues to import ol.TileState.ERROR
            // On the other hand typeof ol.TileState.ERROR is number and it's equals 3
            imageTile.getImage().src = 3;
          } else {
            imageTile.getImage().src = img;
          }
        },
        url: `GS/{z}/{x}/{y}`,
      }),
      displayName: "GOOGLE",
      visible: false,
    },
    {
      local: true,
      id: "HERE-OFFLINE",
      projection: "EPSG:3857",
      source: new ol.source.XYZ({
        tileLoadFunction: async (imageTile, link) => {
          const [provider, z, x, y] = link.split("/");
          const img = await window.electron.getTile({ provider, z, x, y });
          if (!img) {
            // * Indicates that tile loading failed
            // Proper code is imageTile.setState(ol.TileState.ERROR);
            // However I have issues to import ol.TileState.ERROR
            // On the other hand typeof ol.TileState.ERROR is number and it's equals 3
            imageTile.getImage().src = 3;
          } else {
            imageTile.getImage().src = img;
          }
        },
        url: `HERE/{z}/{x}/{y}`,
      }),
      displayName: "HERE",
      visible: false,
    },
    {
      id: "OSM-ONLINE",
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        crossOrigin: null,
      }),
      displayName: "OSM",
      visible: false,
    },
    {
      id: "COSM-ONLINE",
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://b.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
        crossOrigin: null,
      }),
      displayName: "COSM",
      visible: false,
    },
    {
      id: "GOOGLE-ONLINE",
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://khms0.googleapis.com/kh?v=917&hl=en-US&x={x}&y={y}&z={z}",
        crossOrigin: null,
      }),
      displayName: "GOOGLE",
      visible: false,
    },
    {
      id: "HERE-ONLINE",
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://3.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?apiKey=XymxvZ_r1pulL7cA5r9JZ9Rr_m_wOzjDAb4VCm-w1gA",
        crossOrigin: null,
      }),
      displayName: "HERE",
      visible: false,
    },
  ],
  markersColors: [
    {
      id: "green",
      displayName: "Зел",
      colorClass: "m-green",
      selected: true,
    },
    {
      id: "yellow",
      displayName: "Жов",
      colorClass: "m-yellow",
    },
    {
      id: "red",
      displayName: "Чер",
      colorClass: "m-red",
    },
  ],
  center: [30.54, 50.45],
  zoom: 9,
};
