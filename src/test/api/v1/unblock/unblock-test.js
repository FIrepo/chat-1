'use strict';

const expect = require('chai').expect;
const co = require('co');
const Chance = require('chance');

const getLoggedinAgentWithUser = require('../../../util/agent.js').getLoggedinAgentWithUser;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;

const UserDao = require('../../../../dal/user/userDao.js').UserDao;
const BlockDao = require('../../../../dal/block/blockDao.js').BlockDao;


const chance = new Chance();
const username = chance.first();
const username1 = chance.last();


describe('unblock test', () => {
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
      this.userIBlocked1 = user;
      return UserDao.create({
        username: username1,
      });
    })
    .then((user) => {
      this.userIBlocked2 = user;
      return BlockDao.create({
        blockerUser: UserDao.getId(this.user),
        blockedUser: UserDao.getId(this.userIBlocked1),
      });
    })
    .then((block) => {
      this.block1 = block;
      return BlockDao.create({
        blockerUser: UserDao.getId(this.user),
        blockedUser: UserDao.getId(this.userIBlocked2),
      });
    })
    .then((block) => {
      this.block2 = block;
    });
  });
  it('should unblock user', function() {
    return co(function * () {
      yield this.agent.delete(api.unblock(UserDao.getId(this.userIBlocked1))).expect(200);
      const res = yield this.agent.get(api.listBlocked(UserDao.getId(this.user))).expect(200);

      expect(res.body).to.be.ok;
      expect(res.body.data.blockedUsers.length).to.equal(1);
    }.bind(this));
  });
});
