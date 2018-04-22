'use strict';

const FriendService = require('../../../service/friend/friendService.js').FriendService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function getMyFriends(req, res, next) {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const query = req.query.q;
  const myId = UserDao.getId(req.user);

  return FriendService.listMyFriends(myId, query, { limit, skip })
  .then(({ friends, count }) => {
    return res.pack({ friends, count });
  })
  .catch(next);
}

exports.getMyFriends = getMyFriends;
