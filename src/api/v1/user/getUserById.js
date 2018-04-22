'use strict';

const UserService = require('../../../service/user/userService.js').UserService;

function getUserById(req, res, next) {
  const id = req.params.userId;

  return UserService.getById(id)
    .then(user => {
      return res.pack({ user });
    })
    .catch(next);
}

exports.getUserById = getUserById;
