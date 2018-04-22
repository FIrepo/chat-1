'use strict';

const express = require('express');

const getIsFollowedByMe = require('./getIsFollowedByMe.js').getIsFollowedByMe;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.get('/:userId', isAuthenticated(), getIsFollowedByMe);

exports.router = router;
