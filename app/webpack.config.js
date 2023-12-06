const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const ArcGISPlugin = require("@arcgis/webpack-plugin");

const config = withModuleFederationPlugin({
  name: 'maps',
  exposes: {  // List of modules that the application will export as remote to another application
    './MapsModule': './src/app/maps/maps.module.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});

// Prior to this addition build size was 29mb (uncompressed)
// After this addition, build size 2mb (uncompressed);
config.plugins.push(
  new ArcGISPlugin({
    locales: ['en'],
    userDefinedExcludes: [
      "@arcgis/core/layers/BingMapsLayer",
      "@arcgis/core/layers/CSVLayer",
      "@arcgis/core/layers/GeoRSSLayer",
      "@arcgis/core/layers/ImageryLayer",
      "@arcgis/core/layers/KMLLayer",
      "@arcgis/core/layers/MapImageLayer",
      "@arcgis/core/layers/OpenStreetMapLayer",
      "@arcgis/core/layers/StreamLayer",
      "@arcgis/core/layers/WMSLayer",
      "@arcgis/core/layers/WMTSLayer",
      "@arcgis/core/layers/WebTileLayer"
    ]
  })
);

module.exports = config;




