'use strict';

const FollowService = require('../../../service/follow/followService.js').FollowService;
const UserDao = require('../../../dal/user/userDao.js').UserDao;


function deleteFollowingById(req, res, next) {
  const followedUserId = req.params.userId;
  const myUserId = UserDao.getId(req.user);

  return FollowService.unFollowUser(
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

exports.deleteFollowingById = deleteFollowingById;
