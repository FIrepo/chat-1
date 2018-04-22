'use strict';
const co = require('co');
const _ = require('lodash');


const FollowDao = require('../../dal/follow/followDao.js').FollowDao;

class FriendService {
  listMyFriends(id, query, { limit, skip }) {
    return co(function * coListMyFriends() {
      const queryParts = query.split(' ');
      const myFollowers = yield FollowDao.findFollowersById(id);
      const followedUserIds = _.map(myFollowers, (myFollower) => {
        return myFollower.followerUser;
      });
      const myFriends = yield FollowDao.findMyFriends(followedUserIds, id);

      const { friends, count } = yield FollowDao.findFriendsByQueryParts(myFriends, queryParts, { limit, skip });
      return { friends, count };
    });
  }

  numberOfMyFriends(myId) {
    return co(function * coNumberOfFriends() {
      const followerUsers = yield FollowDao.findFollowersById(myId);
      const followedUserIds = _.map(followerUsers, (follower) => {
        return follower.followerUser;
      });
      const count = yield FollowDao.countFriends(followedUserIds, myId);
      return count;
    });
  }

  getIsFriend(userId, myId) {
    return co(function * coGetIsFriend() {
      const isIFollow = yield FollowDao.countFollowersById(userId, myId);
      const isFollowingMe = yield FollowDao.countFollowersById(myId, userId);
      return isIFollow > 0 && isFollowingMe > 0;
    });
  }

}
exports.FriendServiceClass = FriendService;
exports.FriendService = new FriendService();
