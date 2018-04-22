'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const shoutOutLikeSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  when: Date,
});

exports.shoutOutLikeSchema = shoutOutLikeSchema;
