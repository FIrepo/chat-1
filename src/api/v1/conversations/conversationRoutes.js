'use strict';

const express = require('express');

const getConversationsWithLastMessages =
require('./getConversationsWithLastMessages.js').getConversationsWithLastMessages;
const getConversationById = require('./getConversation.js').getConversationById;
const postConversation = require('./postConversation.js').postConversation;

const router = express.Router();

router.get('/', getConversationsWithLastMessages);
router.get('/:conversationId/messages', getConversationById);
router.post('/', postConversation);

exports.router = router;
