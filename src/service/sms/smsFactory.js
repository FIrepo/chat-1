'use strict';

const AmazonSmsService = require('./amazonSmsService.js').AmazonSmsService;
const StubSmsService = require('./stubSmsService.js').StubSmsService;
const config = require('../../config/config.js').config;

class SmsFactory {
  static SmsServiceInstance() {
    if (config.smsService === 'stub') {
      return StubSmsService;
    }
    return AmazonSmsService;
  }
}

exports.SmsServiceInstance = SmsFactory.SmsServiceInstance();
