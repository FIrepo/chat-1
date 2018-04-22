'use strict';

const co = require('co');
const mongoose = require('mongoose');
const winston = require('winston');

const config = require('../config/config.js').config;

mongoose.Promise = Promise;
const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
let db;

function connect() {
  return co(function * coConnect() {
    if (db) {
      return Promise.resolve(db);
    }
    mongoose.connect(connectionString);
    db = mongoose.connection;
    return new Promise((resolve, reject) => {
      db.once('open', () => {
        winston.info(`Mongoose connection opened on port: ${config.db.port}.`);
        return resolve(db);
      });
      db.on('error', (err) => {
        winston.error('Mongoose connection failed', err);
        return reject(err);
      });
    });
  });
}


exports.connect = connect;
exports.mongoose = mongoose;
