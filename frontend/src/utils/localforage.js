const localforage = require('localforage');

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'wb-data',
  version: 1.0,
  storeName: 'wb_data', // Should be alphanumeric, with underscores.
  description: 'Offline data for Weight Boss app.',
});

export default localforage;
