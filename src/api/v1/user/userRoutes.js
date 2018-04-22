'use strict';

const express = require('express');

const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;
const putUpdateCurrentUser = require('./putUpdateCurrentUser.js').putUpdateCurrentUser;
const getCurrentUser = require('./getCurrentUser.js').getCurrentUser;
const getUserById = require('./getUserById.js').getUserById;

const router = express.Router();

router.put('/', isAuthenticated(), putUpdateCurrentUser);
router.get('/me', isAuthenticated(), getCurrentUser);
router.get('/:userId', getUserById);

exports.router = router;
