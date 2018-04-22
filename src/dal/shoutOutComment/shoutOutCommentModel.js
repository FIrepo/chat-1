'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'ShoutOutComment';

const shoutOutCommentSchema = require('./shoutOutCommentSchema.js').shoutOutCommentSchema;
const ShoutOutComment = mongoose.model(name, shoutOutCommentSchema);

exports.name = name;
exports.ShoutOutComment = ShoutOutComment;
