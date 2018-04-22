'use strict';

const UserService = require('../../../service/user/userService.js').UserService;

function putUpdateCurrentUser(req, res, next) {
  const userId = req.user._id;
  const userData = req.body;

  return UserService.updateById(userId, userData)
      .then(user => {
        return res.pack({ user });
      })
      .catch(next);
}


exports.putUpdateCurrentUser = putUpdateCurrentUser;
