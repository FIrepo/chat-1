'use strict';

const express = require('express');

const postBlockById = require('./postBlockById.js').postBlockById;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.post('/:userId', isAuthenticated(), postBlockById);

exports.router = router;
