'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const conversationParticipationSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  seenAt: Date,
  muteUntil: Date,
});

exports.conversationParticipationSchema = conversationParticipationSchema;
