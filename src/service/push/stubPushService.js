'use strict';

const winston = require('winston');

const PushService = require('./pushService.js').PushService;

class StubPushService extends PushService {
  createTopic(data) {
    winston.info('Topic ARN created:', data);
    return data;
  }

  createQueue(data) {
    winston.info('Queue URL created:', data);
    return data;
  }

  getQueueAttributes(data) {
    winston.info('Queue ARN created:', data);
    return data;
  }

  createSubscribtion(data) {
    winston.info('Subscription created:', data);
    return data;
  }

  allowTopic(data) {
    winston.info('Topic allowed:', data);
    return data;
  }

  sendPush(data) {
    winston.info('Push sent', data);
    return data;
  }
}

exports.StubPushServiceClass = StubPushService;
exports.StubPushService = new StubPushService();
