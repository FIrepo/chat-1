'use strict';

const Boom = require('boom');

function isAuthenticated() {
  return (req, res, next) => {
    if (req.user) {
      return next();
    }
    return next(Boom.unauthorized('Access denied.'));
  };
}

exports.isAuthenticated = isAuthenticated;
