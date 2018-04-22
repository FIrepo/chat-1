'use strict';

const co = require('co');
const Boom = require('boom');

const FollowDao = require('../../dal/follow/followDao.js').FollowDao;
const DaoService = require('../daoService.js').DaoService;

const UserDao = require('../../dal/user/userDao.js').UserDao;

class FollowService extends DaoService {
  followUser(userIdToFollow, userIdWhoWantsToFollow) {
    return co(function * coFollowUser() {
      const userToFollow = yield UserDao.findById(userIdToFollow);
      if (!userToFollow) {
        throw Boom.notFound(`with id: ${userIdToFollow}`);
      }
      const isIFollow = yield FollowDao.countFollowersById(userIdToFollow, userIdWhoWantsToFollow);
      if (isIFollow > 0) {
        throw Boom.badRequest(`You already follow ${userIdToFollow}`);
      }

      return FollowDao.followUser(userIdToFollow, userIdWhoWantsToFollow);
    });
  }

  unFollowUser(userIdToUnFollow, userIdWhoWantsToUnFollow) {
    return co(function * coDeleteFollowing() {
      const unFollow = yield FollowDao.unfollowUser(userIdToUnFollow, userIdWhoWantsToUnFollow);
      return unFollow;
    });
  }

  listMyFollowers(id, { limit, skip }) {
    return co(function * coListFollowers() {
      const { followers, count } = yield FollowDao.findFollowers(id, { limit, skip });
      return { followers, count };
    });
  }


  listFollowedByMe(id, { limit, skip }) {
    return co(function * coListFollowed() {
      const { followedUsers, count } = yield FollowDao.findFollowed(id, { limit, skip });
      return { followedUsers, count };
    });
  }

  numberOfMyFollowers(followedUserId) {
    return co(function * coNumberOfFollowers() {
      const count = yield FollowDao.countFollowers(followedUserId);
      return count;
    });
  }

  numberOfFollowedByMe(followerUserId) {
    return co(function * coNumberOfMyFollowers() {
      const count = yield FollowDao.countFollowed(followerUserId);
      return count;
    });
  }

  getIsFollower(followerUserId, followedUserId) {
    return FollowDao.countFollowersById(followerUserId, followedUserId).then(isFollower => {
      return (isFollower > 0);
    });
  }

  getIsFollowedByMe(followedUserId, followerUserId) {
    return FollowDao.countFollowersById(followerUserId, followedUserId)
    .then(isFollowed => {
      return (isFollowed > 0);
    });
  }

}

exports.FollowServiceClass = FollowService;
exports.FollowService = new FollowService(FollowDao);
