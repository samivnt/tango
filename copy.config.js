module.exports = {
  copyLeaflet: {
    src: ['{{ROOT}}/node_modules/leaflet/dist/leaflet.css'],
    dest: '{{WWW}}/assets/leaflet/'
  },
  copyLeafletAssets: {
    src: ['{{ROOT}}/node_modules/leaflet/dist/images/**/*'],
    dest: '{{WWW}}/assets/leaflet/images/'
  }
};
