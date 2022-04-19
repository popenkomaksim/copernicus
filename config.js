const emptyGif =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const config = {
  layers: [
    {
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
      displayName: "OSM-LOCAL",
      visible: true,
    },
    {
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
      displayName: "COSM-LOCAL",
      visible: false,
    },
    {
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
      displayName: "GS-LOCAL",
      visible: false,
    },
    {
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
      displayName: "HERE-LOCAL",
      visible: false,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://khms0.googleapis.com/kh?v=917&hl=en-US&x={x}&y={y}&z={z}",
        crossOrigin: null,
      }),
      displayName: "GS-ONLINE",
      visible: false,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://b.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
        crossOrigin: null,
      }),
      displayName: "COSM-ONLINE",
      visible: false,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        crossOrigin: null,
      }),
      displayName: "OSM-ONLINE",
      visible: false,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: "https://3.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?apiKey=t_kKKAHgEZ-SCa-v08N8xCchEK_wxxp7dFAmEOpi9hs",
        crossOrigin: null,
      }),
      displayName: "HERE-ONLINE",
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
  zoom: 10,
};
