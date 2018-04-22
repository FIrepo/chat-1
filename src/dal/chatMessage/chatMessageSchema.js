'use strict';

const mongoose = require('../dal.js').mongoose;
const User = require('../user/userModel.js').name;
const Conversation = require('../conversation/conversationModel.js').name;
const ObjectId = mongoose.Schema.Types.ObjectId;
const timestamps = require('mongoose-timestamp');

const chatMessageSchema = new mongoose.Schema({
  text: String,
  creator: { type: ObjectId, ref: User },
  conversation: { type: ObjectId, ref: Conversation },
});

chatMessageSchema.plugin(timestamps);

exports.chatMessageSchema = chatMessageSchema;
