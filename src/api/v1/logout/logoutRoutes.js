'use strict';

const express = require('express');

const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;
const postLogout = require('./postLogout.js').postLogout;

const router = express.Router();

router.delete('/', isAuthenticated(), postLogout);

exports.router = router;
