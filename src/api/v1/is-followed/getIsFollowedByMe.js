'use strict';

const FollowService = require('../../../service/follow/followService.js').FollowService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;


function getIsFollowedByMe(req, res, next) {
  const userId = req.params.userId;
  const myId = UserDao.getId(req.user);
  return FollowService.getIsFollowedByMe(userId, myId)
  .then((isFollowed) => {
    return res.pack({ isFollowed });
  })
  .catch(next);
}

exports.getIsFollowedByMe = getIsFollowedByMe;
