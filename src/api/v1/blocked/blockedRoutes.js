'use strict';

const express = require('express');

const getBlocked = require('./getBlocked.js').getBlocked;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.get('/', isAuthenticated(), getBlocked);

exports.router = router;
