'use strict';

const expect = require('chai').expect;
const co = require('co');
const Chance = require('chance');

const getLoggedinAgent = require('../../../util/agent.js').getLoggedinAgent;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;

const chance = new Chance();
const phoneNumber = chance.phone({ formatted: false });
const username = chance.first();


describe('update current user tests', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgent();
    }).then(agent => {
      this.agent = agent;
    });
  });

  it('should update current user!', function() {
    return co(function * () {
      const res = yield this.agent.put(api.updateCurrentUser())
        .send({ phoneNumber, username })
        .expect(200);
      expect(res.body).to.be.ok;
      const resCurrentUser = yield this.agent.get(api.currentUser()).expect(200);
      expect(resCurrentUser.body.data.user).to.have.property('phoneNumber', phoneNumber);
      expect(resCurrentUser.body.data.user).to.have.property('username', username);
    }.bind(this));
  });
});
