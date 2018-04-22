'use strict';

const expect = require('chai').expect;
const co = require('co');
const Chance = require('chance');

const getLoggedinAgentWithUser = require('../../../util/agent.js').getLoggedinAgentWithUser;

const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;

const UserDao = require('../../../../dal/user/userDao.js').UserDao;

const chance = new Chance();
const username = chance.first();

describe('block test', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgentWithUser();
    }).then(({ agent, user }) => {
      this.agent = agent;
      this.user = user;
    });
  });

  it('should block user', function() {
    return co(function * () {
      const userToBlock = yield UserDao.create({
        username,
      });
      yield this.agent.post(api.block(UserDao.getId(userToBlock))).send().expect(201);
      const res = yield this.agent.get(api.listBlocked(UserDao.getId(this.user))).expect(200);
      expect(res.body.data.blockedUsers.length).to.equal(1);
      yield this.agent.post(api.block(UserDao.getId(userToBlock))).send().expect(400);
    }.bind(this));
  });
});
