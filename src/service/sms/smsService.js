'use strict';

class SmsService {
  createCode() {
    const code = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    return code;
  }

  sendSms(code, phoneNumber) { // eslint-disable-line no-unused-vars
  }
}

exports.SmsService = SmsService;
