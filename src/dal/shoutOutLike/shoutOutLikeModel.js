'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'ShoutOutLike';

const shoutOutLikeSchema = require('./shoutOutLikeSchema.js').shoutOutLikeSchema;
const ShoutOutLike = mongoose.model(name, shoutOutLikeSchema);

exports.name = name;
exports.ShoutOutLike = ShoutOutLike;
