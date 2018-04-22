'use strict';

const FollowService = require('../../../service/follow/followService.js').FollowService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function getFollowedByMe(req, res, next) {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const id = UserDao.getId(req.user);

  return FollowService.listFollowedByMe(id, {
    limit,
    skip,
  })
  .then(({ count, followedUsers }) => {
    return res.pack({ count, followedUsers });
  })
  .catch(next);
}

exports.getFollowedByMe = getFollowedByMe;
