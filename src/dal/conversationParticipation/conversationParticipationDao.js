'use strict';

const MongooseDao = require('../mongooseDao.js').MongooseDao;
const ConversationParticipation = require('./conversationParticipationModel.js').ConversationParticipation;

class ConversationPatricipationDao extends MongooseDao {
  createFromArray(participants) {
    return Promise.all(participants.map(participant => {
      return this.create({
        user: participant,
      });
    }));
  }
}

exports.ConversationParticipationDaoClass = ConversationPatricipationDao;
exports.ConversationParticipationDao = new ConversationPatricipationDao(ConversationParticipation);
