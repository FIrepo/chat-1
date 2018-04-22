'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

const config = require('./config/config.js').config;
const responsePacker = require('./middleware/responsePacker.js').responsePacker;
const errorHandler = require('./middleware/errorHandler.js').errorHandler;
const apiRoutes = require('./api/apiRoutes.js').router;

let app;
function start() {
  if (app) {
    return Promise.resolve(app);
  }
  app = express();


  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan(':method :url :response-time ms'));
  app.use(responsePacker());
  app.use(session({
    secret: 'SESSION_SECRET',
    saveUninitialized: true,
    resave: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/api', apiRoutes);

  app.use(errorHandler());

  return new Promise(resolve => {
    app.listen(config.port, () => {
      winston.info(`HTTP server started on port ${config.port}.`);
      return resolve(app);
    });
  });
}

exports.start = start;
