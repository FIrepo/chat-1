'use strict';

const express = require('express');

const deleteBlockById = require('./deleteBlockById.js').deleteBlockById;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.delete('/:userId', isAuthenticated(), deleteBlockById);

exports.router = router;
