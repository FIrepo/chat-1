'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const followSchema = new mongoose.Schema({
  followedUser: { type: ObjectId, ref: 'User' },
  followerUser: { type: ObjectId, ref: 'User' },
  followedAt: Date,
});

exports.followSchema = followSchema;
