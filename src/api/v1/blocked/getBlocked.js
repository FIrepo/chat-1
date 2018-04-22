'use strict';

const BlockService = require('../../../service/block/blockService.js').BlockService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function getBlocked(req, res, next) {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const id = UserDao.getId(req.user);

  return BlockService.listBlockedUsers(id, { limit, skip })
  .then(({ count, blockedUsers }) => {
    return res.pack({ count, blockedUsers });
  })
  .catch(next);
}

exports.getBlocked = getBlocked;
