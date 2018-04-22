'use strict';

const express = require('express');

const getStatus = require('./getStatus.js').getStatus;

const router = express.Router();

router.get('/', getStatus);

exports.router = router;
