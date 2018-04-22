'use strict';

const express = require('express');

const postLogin = require('./postLogin.js').postLogin;
const validateRoute = require('./validate/postValidate.js').router;

const router = express.Router();

router.use('/validate', validateRoute);
router.post('/', postLogin);


exports.router = router;
