'use strict';

const FollowService = require('../../../service/follow/followService.js').FollowService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;


function getMyFollowersNumber(req, res, next) {
  const userId = UserDao.getId(req.user);
  return FollowService.numberOfMyFollowers(userId)
  .then(count => {
    return res.pack({ count });
  })
  .catch(next);
}

exports.getMyFollowersNumber = getMyFollowersNumber;
