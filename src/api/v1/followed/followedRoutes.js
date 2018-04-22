'use strict';

const express = require('express');

const getFollowedByMe = require('./getFollowedByMe.js').getFollowedByMe;
const getFollowedByMeNumber = require('./getFollowedByMeNumber.js').getFollowedByMeNumber;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;


const router = express.Router();

router.get('/by-me', isAuthenticated(), getFollowedByMe);
router.get('/by-me/count', isAuthenticated(), getFollowedByMeNumber);

exports.router = router;
