'use strict';

const mongoose = require('../dal.js').mongoose;
const ChatMessage = require('../chatMessage/chatMessageModel.js').name;
const ConversationParticipation = require('../conversationParticipation/conversationParticipationModel.js').name;
const ObjectId = mongoose.Schema.Types.ObjectId;

const conversationSchema = new mongoose.Schema({
  title: String,
  mqttTopic: String,
  groupName: String,
  groupPictureUrl: String,
  participants: [{
    type: ObjectId,
    ref: ConversationParticipation,
  }],
});
conversationSchema.virtual('lastSenderUser')
.get().set(); // TODO
conversationSchema.virtual('lastDeliveredAt')
.get().set(); // TODO
conversationSchema.virtual('lastMessage', {
  ref: ChatMessage,
  localField: '_id',
  foreignField: 'conversation',
});

exports.conversationSchema = conversationSchema;
