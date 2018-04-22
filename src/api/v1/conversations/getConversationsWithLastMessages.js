'use strict';

const ConversationService =
require('../../../service/conversation/conversationService.js').ConversationService;

function getConversationsWithLastMessages(req, res, next) {
  const limit = parseInt(req.query.limit, 10);
  const skip = parseInt(req.query.skip, 10);
  return ConversationService.getAllWithLastMessages({ limit, skip })
    .then(response => {
      return res.pack(response);
    })
    .catch(next);
}

exports.getConversationsWithLastMessages = getConversationsWithLastMessages;
