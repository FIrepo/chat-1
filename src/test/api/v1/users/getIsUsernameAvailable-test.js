'use strict';

const expect = require('chai').expect;
const Chance = require('chance');

const getAgent = require('../../../util/agent.js').getAgent;
const api = require('../../../util/api.js').api;
const UserDao = require('../../../../dal/user/userDao.js').UserDao;

const chance = new Chance();
const username = chance.first();
const username2 = chance.last();

describe('is username available tests', () => {
  before(function() {
    return getAgent().then(agent => {
      this.agent = agent;
      return UserDao.remove({});
    })
    .then(() => {
      return UserDao.create({
        username,
      });
    });
  });

  it('should username is available!', function() {
    return this.agent.get(api.isUsernameAvailable(username)).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('isAvailable', true);
    });
  });

  it('should username is not available!', function() {
    return this.agent.get(api.isUsernameAvailable(username2)).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('isAvailable', false);
    });
  });
});
