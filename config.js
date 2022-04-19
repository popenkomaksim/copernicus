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
            // debugger;
            // imageTile.setState(ol.TileState.ERROR);
          } else {
            imageTile.getImage().src = img;
          }
          // Expected options:
          // imageTile.getImage().src =
          //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
          // imageTile.getImage().src =
          //   "https://images.unsplash.com/photo-1561542320-9a18cd340469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
        },
        url: `OSM/{z}/{x}/{y}`,
      }),
      displayName: "OSM-LOCAL",
      visible: true,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        // url: `http://localhost:${window.port}/GS/{z}/{x}/{y}`,
        url: "https://khms0.googleapis.com/kh?v=917&hl=en-US&x={x}&y={y}&z={z}",
        crossOrigin: null,
      }),
      displayName: "GS",
      visible: false,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        url: `http://localhost:${window.port}/COSM/{z}/{x}/{y}`,
        // url: "https://b.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
        crossOrigin: null,
      }),
      displayName: "COSM",
      visible: false,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        // url: './maps/openStreetMap/{z}/{x}/{y}.png',

        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        crossOrigin: null,
      }),
      displayName: "OSM",
      visible: false,
    },
    {
      projection: "EPSG:3857",
      source: new ol.source.OSM({
        // url: './maps/openStreetMap/{z}/{x}/{y}.png',

        url: "https://3.aerial.maps.ls.hereapi.com/maptile/2.1/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?apiKey=t_kKKAHgEZ-SCa-v08N8xCchEK_wxxp7dFAmEOpi9hs",
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
  zoom: 10,
};
