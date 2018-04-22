'use strict';

const FollowService = require('../../../service/follow/followService.js').FollowService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;


function getIsFollower(req, res, next) {
  const userId = req.params.userId;
  const myId = UserDao.getId(req.user);

  return FollowService.getIsFollower(userId, myId)
  .then((isFollower) => {
    return res.pack({ isFollower });
  })
  .catch(next);
}

exports.getIsFollower = getIsFollower;
