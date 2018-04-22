'use strict';

const _ = require('lodash');

const MongooseDao = require('../mongooseDao.js').MongooseDao;
const User = require('./userModel.js').User;

class UserDao extends MongooseDao {
  findAndCountByQueryParts(queryParts, { limit, skip }) {
    const condition = {
      $and: _.map(queryParts, queryPart => {
        return {
          $or: [{
            firstName: new RegExp(queryPart, 'i'),
          }, {
            lastName: new RegExp(queryPart, 'i'),
          }, {
            phoneNumber: new RegExp(queryPart, 'i'),
          }, {
            username: new RegExp(queryPart, 'i'),
          }],
        };
      }),
    };
    return this.findAndCount(condition, { limit, skip })
      .then(({ items, count }) => ({ users: items, count }));
  }

  findByPhoneNumber(phoneNumber) {
    return this.findOne({ phoneNumber });
  }

  countUsername(username) {
    return this.count({ username });
  }
}

exports.UserDaoClass = UserDao;
exports.UserDao = new UserDao(User);
