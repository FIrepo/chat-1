'use strict';

const Boom = require('boom');

const publish = require('../../mqttHelper.js').publish;
const DaoService = require('../daoService.js').DaoService;
const ConversationDao = require('../../dal/conversation/conversationDao.js').ConversationDao;
const ConversationParticipationDao =
require('../../dal/conversationParticipation/conversationParticipationDao.js').ConversationParticipationDao;

class ConversationService extends DaoService {
  saveConversation(conversation) {
    return ConversationParticipationDao
    .createFromArray(conversation.participants)
    .then(participants => {
      conversation.participants = participants;
      return this.create(conversation);
    })
    .then(persistedConversation => {
      this.alertAllParticipants(persistedConversation);
      return persistedConversation;
    })
    .catch(err => {
      throw Boom.badRequest(err);
    });
  }

  alertAllParticipants(conversation) {
    conversation.participants.forEach((participant) => {
      const message = {
        topic: `event/${participant}`,
        payload: conversation._id,
      };
      publish(message.topic.toString(), message.payload.toString());
    });
  }

  findById(id) {
    return ConversationDao.findById(id);
  }

  findByConversationParticipationId(conversationParticipationId) {
    return ConversationDao.findByConversationParticipationId(conversationParticipationId);
  }

  getAllWithLastMessages(options) {
    const limit = options.limit;
    const skip = options.skip;
    return ConversationDao.find()
    .limit(limit)
    .skip(skip)
    .populate({
      path: 'lastMessage',
      options: { limit: 1, sort: { 'createdAt': -1 } },
    });
  }
}

exports.ConversationServiceClass = ConversationService;
exports.ConversationService = new ConversationService(ConversationDao);
