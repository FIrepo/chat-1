'use strict';

const FriendService = require('../../../service/friend/friendService.js').FriendService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function getMyFriendsNumber(req, res, next) {
  const userId = UserDao.getId(req.user);
  return FriendService.numberOfMyFriends(userId)
  .then(count => {
    return res.pack({ count });
  })
  .catch(next);
}

exports.getMyFriendsNumber = getMyFriendsNumber;
