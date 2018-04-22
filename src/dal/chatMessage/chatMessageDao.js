'use strict';

const MongooseDao = require('../mongooseDao.js').MongooseDao;
const ChatMessage = require('../../dal/chatMessage/chatMessageModel.js').ChatMessage;

class ChatMessageDao extends MongooseDao {
  getMessagesByConversationId(conversation) {
    return ChatMessage.find({ conversation });
  }
}

exports.ChatMessageDaoClass = ChatMessageDao;
exports.ChatMessageDao = new ChatMessageDao(ChatMessage);
