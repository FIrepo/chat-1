'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'ShoutOutSeen';

const shoutOutSeenSchema = require('./shoutOutSeenSchema.js').shoutOutSeenSchema;
const ShoutOutSeen = mongoose.model(name, shoutOutSeenSchema);

exports.name = name;
exports.ShoutOutSeen = ShoutOutSeen;
