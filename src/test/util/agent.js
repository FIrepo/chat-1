'use strict';

const request = require('supertest-as-promised');
const Chance = require('chance');
const co = require('co');

const codeBuffer = require('../../service/sms/smsFactory.js').SmsServiceInstance.codeBuffer;
const api = require('./api.js').api;
const httpServer = require('../../httpServer.js');
const dal = require('../../dal/dal.js');

const chance = new Chance();

function getAgent() {
  return dal.connect().then(() => {
    return httpServer.start();
  }).then(app => {
    const agent = request.agent(app);
    return agent;
  });
}

function getLoggedinAgent() {
  return co(function * coGetLoggedinAgent() {
    const agent = yield getAgent();
    const phoneNumber = chance.phone({ formatted: false });

    yield agent.post(api.login())
      .send({ phoneNumber })
      .expect(201);

    const code = codeBuffer.shift();
    yield agent.post(api.loginValidate())
      .send({ phoneNumber, code })
      .expect(200);

    return agent;
  });
}

function getLoggedinAgentWithUser() {
  return co(function * coGetLoggedinAgentWithUser() {
    const agent = yield getLoggedinAgent();
    const res = yield agent.get(api.currentUser()).expect(200);
    const user = res.body.data.user;

    return {
      agent,
      user,
    };
  });
}

exports.getAgent = getAgent;
exports.getLoggedinAgent = getLoggedinAgent;
exports.getLoggedinAgentWithUser = getLoggedinAgentWithUser;
