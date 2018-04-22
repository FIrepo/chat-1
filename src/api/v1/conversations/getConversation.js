'use strict';

const ConversationService = require('../../../service/conversation/conversationService.js').ConversationService;

function getConversationById(req, res, next) {
  const id = req.params.conversationId;

  return ConversationService.findById(id)
    .then(conversation => {
      return res.pack({ conversation });
    })
    .catch(next);
}

exports.getConversationById = getConversationById;
