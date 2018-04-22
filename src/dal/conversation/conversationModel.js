'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'Conversation';

const conversationSchema = require('./conversationSchema.js').conversationSchema;
const Conversation = mongoose.model(name, conversationSchema);

exports.name = name;
exports.Conversation = Conversation;
