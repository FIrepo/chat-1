'use strict';

const FollowService = require('../../../service/follow/followService.js').FollowService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;

function postFollowerById(req, res, next) {
  const followedUserId = req.params.userId;
  const myUserId = UserDao.getId(req.user);

  return FollowService.followUser(
    followedUserId,
    myUserId
  )
  .then(() => {
    return res.sendStatus(201);
  })
  .catch((err) => {
    return next(err);
  });
}

exports.postFollowerById = postFollowerById;
