'use strict';

const express = require('express');

const getMyFollowers = require('./getMyFollowers.js').getMyFollowers;
const getMyFollowersNumber = require('./getMyFollowersNumber.js').getMyFollowersNumber;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;


const router = express.Router();

router.get('/my', isAuthenticated(), getMyFollowers);
router.get('/my/count', isAuthenticated(), getMyFollowersNumber);

exports.router = router;
