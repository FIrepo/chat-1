'use strict';

const winston = require('winston');

function errorHandler() {
  return (err, req, res, next) => { // eslint-disable-line no-unused-vars
    if (err.isBoom) {
      res.status(err.output.statusCode);
      return res.pack(err.output.payload);
    }
    winston.error(err);
    res.status(500);
    return res.pack(err);
  };
}

exports.errorHandler = errorHandler;
