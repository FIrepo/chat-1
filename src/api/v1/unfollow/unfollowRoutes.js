'use strict';

const express = require('express');

const deleteFollowingById = require('./deleteFollowingById.js').deleteFollowingById;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.delete('/:userId', isAuthenticated(), deleteFollowingById);

exports.router = router;
