'use strict';

const expect = require('chai').expect;
const co = require('co');
const Chance = require('chance');

const getLoggedinAgent = require('../../../util/agent.js').getLoggedinAgent;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;

const UserDao = require('../../../../dal/user/userDao.js').UserDao;

const chance = new Chance();
const username = chance.first();


describe('unfollow test', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgent();
    }).then(agent => {
      this.agent = agent;
    });
  });

  it('should unfollow user', function() {
    return co(function * () {
      const userToUnfollow = yield UserDao.create({
        username,
      });
      yield this.agent.delete(api.unfollow(userToUnfollow._id)).expect(201);

      const res = yield this.agent.get(api.isFollowedByMe(userToUnfollow._id)).expect(200);

      expect(res.body.data).to.have.property('isFollowed', false);
    }.bind(this));
  });
});
