'use strict';

const FollowService = require('../../../service/follow/followService.js').FollowService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;


function getMyFollowers(req, res, next) {
  const limit = Number(req.query.limit);
  const skip = Number(req.query.skip);
  const id = UserDao.getId(req.user);

  return FollowService.listMyFollowers(id, { limit, skip })
  .then(({ count, followers }) => {
    return res.pack({ count, followers });
  })
  .catch(next);
}

exports.getMyFollowers = getMyFollowers;
