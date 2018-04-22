'use strict';

const ConversationService =
require('../../../service/conversation/conversationService.js').ConversationService;

function postConversation(req, res, next) {
  const conversation = req.body;
  return ConversationService.saveConversation(conversation)
  .then(() => {
    return res.pack.created();
  })
  .catch(next);
}

exports.postConversation = postConversation;
