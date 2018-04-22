'use strict';

const winston = require('winston');

const REJECTION_TIMEOUT = 100;
const unhandledRejections = [];

process.on('unhandledRejection', (err, p) => {
  unhandledRejections.push(p);
  setTimeout(() => {
    if (~unhandledRejections.indexOf(p)) {
      winston.error('unhandledRejection', err);
      throw err;
    }
  }, REJECTION_TIMEOUT);
});

process.on('rejectionHandled', (p) => {
  const index = unhandledRejections.indexOf(p);
  unhandledRejections.splice(index, 1);
});
