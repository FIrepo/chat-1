'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'ConversationParticipation';

const conversationParticipationSchema = require('./conversationParticipationSchema.js').conversationParticipationSchema;
const ConversationParticipation = mongoose.model(name, conversationParticipationSchema);

exports.name = name;
exports.ConversationParticipation = ConversationParticipation;
