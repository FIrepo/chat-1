'use strict';

const expect = require('chai').expect;
const Chance = require('chance');


const getLoggedinAgentWithUser = require('../../../util/agent.js').getLoggedinAgentWithUser;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;
const UserDao = require('../../../../dal/user/userDao.js').UserDao;
const FollowDao = require('../../../../dal/follow/followDao.js').FollowDao;

const chance = new Chance();
const username = chance.first();

describe('is follower test', () => {
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
      this.followerUser = user;
      return FollowDao.create({
        followedUser: UserDao.getId(this.user),
        followerUser: UserDao.getId(this.followerUser),
      });
    })
    .then((follow) => {
      this.follow = follow;
    });
  });

  it('should follower be true', function() {
    return this.agent.get(api.isFollower(UserDao.getId(this.followerUser))).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('isFollower', true);
    });
  });
});
