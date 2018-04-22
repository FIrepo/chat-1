'use strict';

const UserDao = require('../../dal/user/userDao.js').UserDao;
const DaoService = require('../daoService.js').DaoService;

class UserService extends DaoService {
  getUsers(query, { limit, skip }) {
    const queryParts = query.split(' ');

    return UserDao.findAndCountByQueryParts(queryParts, { limit, skip });
  }

  isUsernameAvailable(username) {
    return UserDao.countUsername(username).then(count => {
      return !!count;
    });
  }
}

exports.UserServiceClass = UserService;
exports.UserService = new UserService(UserDao);
