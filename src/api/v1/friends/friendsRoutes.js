'use strict';

const express = require('express');

const getMyFriends = require('./getMyFriends.js').getMyFriends;
const getMyFriendsNumber = require('./getMyFriendsNumber.js').getMyFriendsNumber;
const isAuthenticated = require('../../../middleware/isAuthenticated.js').isAuthenticated;

const router = express.Router();

router.get('/my', isAuthenticated(), getMyFriends);
router.get('/my/count', isAuthenticated(), getMyFriendsNumber);

exports.router = router;
