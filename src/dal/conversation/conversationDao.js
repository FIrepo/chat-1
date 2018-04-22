'use strict';

const MongooseDao = require('../mongooseDao.js').MongooseDao;
const Conversation = require('../../dal/conversation/conversationModel.js').Conversation;

class ConversationDao extends MongooseDao {
  findByConversationParticipationId(conversationParticipationId) {
    return Conversation.find({ participants: conversationParticipationId });
  }
}

exports.ConversationDaoClass = ConversationDao;
exports.ConversationDao = new ConversationDao(Conversation);
