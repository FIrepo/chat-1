'use strict';

const express = require('express');

const getIsFollower = require('./getIsFollower.js').getIsFollower;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;


const router = express.Router();

router.get('/:userId', isAuthenticated(), getIsFollower);

exports.router = router;
