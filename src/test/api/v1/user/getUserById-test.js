'use strict';

const expect = require('chai').expect;
const Chance = require('chance');

const getAgent = require('../../../util/agent.js').getAgent;
const api = require('../../../util/api.js').api;
const UserDao = require('../../../../dal/user/userDao.js').UserDao;
const clearDb = require('../../../util/clearDb.js').clearDb;

const chance = new Chance();
const phoneNumber = chance.phone({ formatted: false });
const username = chance.first();

describe('user by id tests', () => {
  before(function() {
    return clearDb().then(() => {
      return getAgent();
    })
    .then(agent => {
      this.agent = agent;
    })
    .then(() => {
      return UserDao.create({
        phoneNumber,
        username,
      });
    })
    .then((savedUser) => {
      this.savedUserId = savedUser._id;
      return this.savedUserId;
    });
  });

  it('should get user!', function() {
    return this.agent.get(api.userById(this.savedUserId))
    .expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data.user).to.have.property('phoneNumber', phoneNumber);
    });
  });
});
