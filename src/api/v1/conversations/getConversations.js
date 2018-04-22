'use strict';

const ConversationService =
require('../../../service/conversation/conversationService.js').ConversationService;

function getConversations(req, res, next) {
  const conversationParticipationId = req.conversationParticipationId;
  return ConversationService.findByConversationParticipationId(conversationParticipationId)
    .then(conversations => {
      return res.pack({ conversations });
    })
    .catch(next);
}

exports.getConversations = getConversations;
