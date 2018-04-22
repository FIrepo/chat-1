'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const shoutOutSeenSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  shoutOut: { type: ObjectId, ref: 'ShoutOut' },
  seenAt: Date,
});

exports.shoutOutSeenSchema = shoutOutSeenSchema;
