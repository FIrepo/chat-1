'use strict';

const express = require('express');

const getUsers = require('./getUsers.js').getUsers;
const getIsUsernameAvailable = require('./getIsUsernameAvailable.js').getIsUsernameAvailable;

const router = express.Router();

router.get('/', getUsers);
router.get('/is-available/:username', getIsUsernameAvailable);

exports.router = router;
