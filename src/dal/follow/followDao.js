'use strict';

const _ = require('lodash');
const co = require('co');


const MongooseDao = require('../mongooseDao.js').MongooseDao;
const Follow = require('./followModel.js').Follow;
const UserDao = require('../../dal/user/userDao.js').UserDao;

class FollowDao extends MongooseDao {
  followUser(userIdToFollow, userIdWhoWantsToFollow) {
    const follow = new Follow({
      followedUser: userIdToFollow,
      followerUser: userIdWhoWantsToFollow,
      followedAt: new Date(),
    });

    return follow.save()
    .then(createdFollower => {
      return createdFollower ? follow.toJSON() : null;
    });
  }

  unfollowUser(userIdToUnFollow, userIdWhoWantsToUnFollow) {
    return this.remove({
      followedUser: userIdToUnFollow,
      followerUser: userIdWhoWantsToUnFollow,
    });
  }

  findFollowers(followedUserId, { limit, skip }) {
    return Promise.all([
      this.count({
        followedUser: followedUserId,
      }),

      this.find({
        followedUser: followedUserId,
      })
      .populate('followerUser')
      .limit(limit)
      .skip(skip)
      .then(follows => {
        return follows.map(follow => follow.followerUser);
      }),
    ])
    .then(([count, followers]) => ({ count, followers })
  );
  }

  findFollowed(followerUserId, { limit, skip }) {
    return Promise.all([
      this.count({
        followerUser: followerUserId,
      }),

      this.find({
        followerUser: followerUserId,
      })
      .populate('followedUser')
      .limit(limit)
      .skip(skip)
      .then(follows => {
        return follows.map(follow => follow.followedUser);
      }),
    ])
    .then(([count, followedUsers]) => ({ count, followedUsers })
  );
  }

  countFollowers(followedUserId) {
    return this.count({ followedUser: followedUserId });
  }

  countFollowed(followerUserId) {
    return this.count({ followerUser: followerUserId });
  }

  countFollowersById(followerUserId, followedUserId) {
    return this.count({
      $and: [{
        followedUser: followedUserId,
      }, {
        followerUser: followerUserId,
      }],
    });
  }


  countFriends(followedUserIds, followerUserId) {
    return this.count({
      followedUser: {
        $in: followedUserIds,
      },
      followerUser: followerUserId,
    });
  }

  findFollowersById(id) {
    return this.find({
      followedUser: id,
    });
  }

  findMyFriends(followedUserIds, followerUserId) {
    return this.find({
      followedUser: {
        $in: followedUserIds,
      },
      followerUser: followerUserId,
    }).populate('followedUser');
  }

  findFriendsByQueryParts(myFriends, queryParts, { limit, skip }) {
    return co(function * coFindFriendsByQueryParts() {
      const condition = {
        $and: _.concat(
           { _id: { $in: _.map(myFriends, 'followedUser._id') } },
          _.map(queryParts, queryPart => {
            return {
              $or: [{
                firstName: new RegExp(queryPart, 'i'),
              }, {
                lastName: new RegExp(queryPart, 'i'),
              }, {
                phoneNumber: new RegExp(queryPart, 'i'),
              }, {
                username: new RegExp(queryPart, 'i'),
              }],
            };
          })
        ),
      };
      const { items, count } = yield UserDao.findAndCount(condition, { limit, skip });
      return { friends: items, count };
    }.bind(this));
  }
}

exports.FollowDaoClass = FollowDao;
exports.FollowDao = new FollowDao(Follow);
