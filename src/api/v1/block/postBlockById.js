'use strict';

const BlockService = require('../../../service/block/blockService.js').BlockService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function postBlockById(req, res, next) {
  const blockedUserId = req.params.userId;
  const myId = UserDao.getId(req.user);

  return BlockService.blockUser(blockedUserId, myId)
  .then(() => {
    return res.sendStatus(201);
  })
  .catch((err) => {
    return next(err);
  });
}

exports.postBlockById = postBlockById;
