'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const messageReactionSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  reaction: String,
});

exports.messageReactionSchema = messageReactionSchema;
