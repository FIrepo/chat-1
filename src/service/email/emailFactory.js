'use strict';

const AmazonEmailService = require('./amazonEmailService.js').AmazonEmailService;
const StubEmailService = require('./stubEmailService.js').StubEmailService;
const config = require('../../config/config.js').config;

class EmailFactory {
  static EmailServiceInstance() {
    if (config.emailService === 'stub') {
      return StubEmailService;
    }
    return AmazonEmailService;
  }
}

exports.EmailServiceInstance = EmailFactory.EmailServiceInstance();
