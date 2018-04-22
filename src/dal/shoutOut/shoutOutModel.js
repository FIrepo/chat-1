'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'ShoutOut';

const shoutOutSchema = require('./shoutOutSchema.js').shoutOutSchema;
const ShoutOut = mongoose.model(name, shoutOutSchema);

exports.name = name;
exports.ShoutOut = ShoutOut;
