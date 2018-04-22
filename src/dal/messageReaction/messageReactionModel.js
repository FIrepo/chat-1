'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'MessageReaction';

const messageReactionSchema = require('./messageReactionSchema.js').messageReactionSchema;
const MessageReaction = mongoose.model(name, messageReactionSchema);

exports.name = name;
exports.MessageReaction = MessageReaction;
