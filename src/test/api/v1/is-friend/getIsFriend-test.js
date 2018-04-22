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
const username1 = chance.last();

describe('is friend test', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgentWithUser();
    })
    .then(({ agent, user }) => {
      this.agent = agent;
      this.user = user;

      return UserDao.create({
        username,
      });
    }).then((user) => {
      this.friend = user;
      return UserDao.create({
        username: username1,
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

  it('should be friend true', function() {
    return this.agent.get(api.isFriend(UserDao.getId(this.friend))).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('isFriend', true);
    });
  });

  it('should be friend false', function() {
    return this.agent.get(api.isFriend(UserDao.getId(this.notFriend))).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('isFriend', false);
    });
  });
});
