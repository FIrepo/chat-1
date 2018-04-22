'use strict';

const express = require('express');

const postFollowerById = require('./postFollowerById.js').postFollowerById;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.post('/:userId', isAuthenticated(), postFollowerById);

exports.router = router;
