'use strict';

const aws = require('aws-sdk');

const SmsService = require('./smsService.js').SmsService;
const config = require('../../config/config.js').config.amazon.aws;
const sns = new aws.SNS();
aws.config.update(config);

class AmazonSmsService extends SmsService {

  sendSms(code, phoneNumber) { // eslint-disable-line no-unused-vars
    const params = {
      Message: code,
      MessageStructure: 'string',
      PhoneNumber: phoneNumber,
      Subject: 'Validation code',
    };
    return sns.publish(params).promise();
  }
}

exports.AmazonSmsServiceClass = AmazonSmsService;
exports.AmazonSmsService = new AmazonSmsService();
