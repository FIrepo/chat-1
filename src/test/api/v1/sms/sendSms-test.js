'use strict';

const expect = require('chai').expect;
const Chance = require('chance');

require('../../../../config/config.js').config;
const SmsService = require('../../../../service/sms/smsFactory.js').SmsServiceInstance;
const clearDb = require('../../../util/clearDb.js').clearDb;
const getLoggedinAgent = require('../../../util/agent.js').getLoggedinAgent;
const chance = new Chance();

describe('sms tests', () => {
  before(function() {
    return clearDb().then(() => {
      return getLoggedinAgent();
    })
    .then(agent => {
      this.agent = agent;
    });
  });

  it('should send an sms', function() {
    const phoneNumber = chance.phone({ formatted: false });
    const code = SmsService.createCode();
    return SmsService.sendSms(code, phoneNumber)
    .then(response => {
      SmsService.codeBuffer.shift();
      return expect(response).to.equal(code);
    });
  });
});
