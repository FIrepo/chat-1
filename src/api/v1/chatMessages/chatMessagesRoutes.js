'use strict';

const express = require('express');

const getMessagesByConversationId = require('./getChatMessages.js').getMessagesByConversationId;

const router = express.Router();

router.get('/:conversationId', getMessagesByConversationId);

exports.router = router;
