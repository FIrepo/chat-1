'use strict';

const UserService = require('../../../service/user/userService.js').UserService;

function getIsUsernameAvailable(req, res, next) {
  const username = req.params.username;

  return UserService.isUsernameAvailable(username)
    .then(isAvailable => {
      return res.pack({ isAvailable });
    })
    .catch(next);
}

exports.getIsUsernameAvailable = getIsUsernameAvailable;
