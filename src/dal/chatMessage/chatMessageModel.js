'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'ChatMessage';

const chatMessageSchema = require('./chatMessageSchema.js').chatMessageSchema;
const ChatMessage = mongoose.model(name, chatMessageSchema);

exports.name = name;
exports.ChatMessage = ChatMessage;
