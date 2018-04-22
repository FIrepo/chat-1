'use strict';

const BlockService = require('../../../service/block/blockService.js').BlockService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function deleteBlockById(req, res, next) {
  const blockedUserId = req.params.userId;
  const myId = UserDao.getId(req.user);

  return BlockService.unblockUser(blockedUserId, myId)
  .then(() => {
    return res.sendStatus(200);
  })
  .catch((err) => {
    return next(err);
  });
}

exports.deleteBlockById = deleteBlockById;
