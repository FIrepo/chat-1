'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'ShoutOutMute';

const shoutOutMuteSchema = require('./shoutOutMuteSchema.js').shoutOutMuteSchema;
const ShoutOutMute = mongoose.model(name, shoutOutMuteSchema);

exports.name = name;
exports.ShoutOutMute = ShoutOutMute;
