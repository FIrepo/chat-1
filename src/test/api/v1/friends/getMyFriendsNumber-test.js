'use strict';

const expect = require('chai').expect;
const co = require('co');


const getLoggedinAgentWithUser = require('../../../util/agent.js').getLoggedinAgentWithUser;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;
const UserDao = require('../../../../dal/user/userDao.js').UserDao;
const FollowDao = require('../../../../dal/follow/followDao.js').FollowDao;

describe('count my friends test', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgentWithUser();
    })
    .then(({ agent, user }) => {
      this.agent = agent;
      this.user = user;

      return UserDao.create({
        username: 'BarbaraPalvin',
      });
    }).then((user) => {
      this.friend = user;
      return UserDao.create({
        username: 'JustinBieber',
      });
    })
    .then((user) => {
      this.notFriend = user;
      return FollowDao.create({
        followedUser: UserDao.getId(this.user),
        followerUser: UserDao.getId(this.friend),
      });
    })
    .then((follow1) => {
      this.follow = follow1;
      return FollowDao.create({
        followedUser: UserDao.getId(this.friend),
        followerUser: UserDao.getId(this.user),
      });
    })
    .then((follow2) => {
      this.follow2 = follow2;
    });
  });

  it('should be 1 friend', function() {
    return this.agent.get(api.countFriends()).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data.count).to.equal(1);
    });
  });
  it('should be 0 friend', function() {
    return co(function * () {
      const unfollow = yield this.agent.delete(api.unfollow(UserDao.getId(this.friend))).expect(201);
      expect(unfollow.body).to.be.ok;
      const res = yield this.agent.get(api.countFriends()).expect(200);
      expect(res.body).to.be.ok;
      expect(res.body.data.count).to.equal(0);
    }.bind(this));
  });
});
