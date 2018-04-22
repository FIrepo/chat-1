'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const shoutOutCommentSchema = new mongoose.Schema({
  shoutOut: { type: ObjectId, ref: 'ShoutOut' },
  user: { type: ObjectId, ref: 'User' },
  when: Date,
  content: { type: ObjectId, ref: 'Content' },
});

exports.shoutOutCommentSchema = shoutOutCommentSchema;
