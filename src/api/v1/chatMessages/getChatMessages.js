'use strict';

const ChatMessageService = require('../../../service/chatMessage/chatMessageService.js').ChatMessageService;

function getMessagesByConversationId(req, res, next) {
  const conversationId = req.params.conversationId;

  return ChatMessageService.getMessagesByConversationId(conversationId)
    .then(messages => {
      return res.pack({ messages });
    })
    .catch(next);
}

exports.getMessagesByConversationId = getMessagesByConversationId;
