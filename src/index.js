'use strict';

require('./util/unhandledRejectionHandler.js');

const httpServer = require('./httpServer.js');
const mqttServer = require('./mqttServer.js');
const mqttHelper = require('./mqttHelper.js');
const dal = require('./dal/dal.js');

dal.connect().then(() => {
  return httpServer.start();
}).then(() => {
  return mqttServer.start();
}).then(() => {
  return mqttHelper.start();
}).catch(err => {
  setTimeout(() => {
    throw err;
  });
});
