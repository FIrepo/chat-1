'use strict';

const UserService = require('../../../service/user/userService.js').UserService;

function getUsers(req, res, next) {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const query = req.query.q;
  return UserService.getUsers(query, { limit, skip })
  .then(({ count, users }) => {
    return res.pack({ count, users });
  })
  .catch(next);
}

exports.getUsers = getUsers;
