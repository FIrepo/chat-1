'use strict';

const mongoose = require('mongoose');

const dal = require('../../dal/dal.js');

function clearDb() {
  return dal.connect().then(() => {
    return new Promise((resolve, reject) => {
      mongoose.connection.db.dropDatabase((err, result) =>
        err ? reject(err) : resolve(result)
      );
    });
  });
}

exports.clearDb = clearDb;
