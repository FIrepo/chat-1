'use strict';

const FriendService = require('../../../service/friend/friendService.js').FriendService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function getIsFriend(req, res, next) {
  const userId = req.params.userId;
  const myId = UserDao.getId(req.user);

  return FriendService.getIsFriend(
    userId,
    myId
  )
  .then((isFriend) => {
    return res.pack({ isFriend });
  })
  .catch(next);
}

exports.getIsFriend = getIsFriend;
