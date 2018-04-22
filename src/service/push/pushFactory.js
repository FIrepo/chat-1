'use strict';

const AmazonPushService = require('./amazonPushService.js').AmazonPushService;
const StubPushService = require('./stubPushService.js').StubPushService;
const config = require('../../config/config.js').config;

class PushFactory {
  static PushServiceInstance() {
    if (config.pushService === 'stub') {
      return StubPushService;
    }
    return AmazonPushService;
  }
}

exports.PushServiceInstance = PushFactory.PushServiceInstance();
