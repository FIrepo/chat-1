'use strict';

const express = require('express');

const v1Routes = require('./v1/v1Routes.js').router;

const router = express.Router();
router.use('/v1', v1Routes);

exports.router = router;
