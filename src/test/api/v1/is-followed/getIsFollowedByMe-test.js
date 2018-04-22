'use strict';

const expect = require('chai').expect;
const Chance = require('chance');
const co = require('co');

const getLoggedinAgentWithUser = require('../../../util/agent.js').getLoggedinAgentWithUser;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;
const UserDao = require('../../../../dal/user/userDao.js').UserDao;
const FollowDao = require('../../../../dal/follow/followDao.js').FollowDao;

const chance = new Chance();
const username = chance.first();

describe('followed by me test', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgentWithUser();
    })
    .then(({ agent, user }) => {
      this.agent = agent;
      this.user = user;

      return UserDao.create({ username });
    })
    .then((user) => {
      this.userFollowedByMe = user;
      return FollowDao.create({
        followedUser: UserDao.getId(this.userFollowedByMe),
        followerUser: UserDao.getId(this.user),
      });
    })
    .then((follow) => {
      this.follow = follow;
    });
  });

  it('should followed by me be true', function() {
    return this.agent.get(api.isFollowedByMe(UserDao.getId(this.userFollowedByMe))).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('isFollowed', true);
    });
  });

  it('should followed by me be false', function() {
    return co(function * () {
      const unfollow = yield this.agent.delete(api.unfollow(UserDao.getId(this.userFollowedByMe))).expect(201);
      expect(unfollow.body).to.be.ok;
      const res = yield this.agent.get(api.isFollowedByMe(UserDao.getId(this.userFollowedByMe))).expect(200);
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('isFollowed', false);
    }.bind(this));
  });
});
