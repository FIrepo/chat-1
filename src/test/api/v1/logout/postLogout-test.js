'use strict';

const expect = require('chai').expect;
const co = require('co');

const getLoggedinAgent = require('../../../util/agent.js').getLoggedinAgent;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;

describe('logout tests', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgent();
    }).then(agent => {
      this.agent = agent;
    });
  });

  it('should logout user!', function() {
    return co(function * () {
      yield this.agent.delete(api.logout())
        .expect(200);

      const res = yield this.agent.get(api.currentUser()).expect(401);

      expect(res.body.data.user).to.be.an('undefined');
    }.bind(this));
  });
});
