'use strict';

const winston = require('winston');

const SmsService = require('./smsService.js').SmsService;

class StubSmsService extends SmsService {
  constructor() {
    super();
    this.codeBuffer = [];
  }
  sendSms(code, phoneNumber) {
    this.codeBuffer.push(code);
    winston.info('SMS sent to:', phoneNumber, 'code:', code);
    return Promise.resolve(code);
  }
}

exports.StubSmsServiceClass = StubSmsService;
exports.StubSmsService = new StubSmsService();
