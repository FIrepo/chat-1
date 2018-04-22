'use strict';

const expect = require('chai').expect;
const co = require('co');
const Chance = require('chance');

const getAgent = require('../../../util/agent.js').getAgent;
const codeBuffer = require('../../../../service/sms/smsFactory.js').SmsServiceInstance.codeBuffer;
const api = require('../../../util/api.js').api;
const clearDb = require('../../../util/clearDb.js').clearDb;

const chance = new Chance();

describe('login tests', () => {
  before(function() {
    return clearDb();
  });

  it('should login user', function() {
    return co(function * () {
      const agent = yield getAgent();
      const phoneNumber = chance.phone({ formatted: false });

      yield agent.post(api.login())
        .send({ phoneNumber })
        .expect(201);

      const code = codeBuffer.shift();
      yield agent.post(api.loginValidate())
        .send({ phoneNumber, code })
        .expect(200);

      const res = yield agent.get(api.currentUser()).expect(200);

      expect(res.body.data).to.have.property('user');
    }.bind(this));
  });
});
