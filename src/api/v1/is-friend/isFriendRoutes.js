'use strict';

const express = require('express');

const getIsFriend = require('./getIsFriend.js').getIsFriend;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.get('/:userId', isAuthenticated(), getIsFriend);

exports.router = router;
