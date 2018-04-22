'use strict';

const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');

const EmailService = require('./emailService.js').EmailService;
const config = require('../../config/config.js').config.amazon;
aws.config.update(config.aws);
const ses = new aws.SES({ apiVersion: '2010-12-01' });
const transport = nodemailer.createTransport(sesTransport({
  ses: ses,
}));

class AmazonEmailService extends EmailService {
  sendMail(data) {
    const emailData = {
      from: config.emailFrom,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };
    return transport.sendMail(emailData);
  }
}

exports.AmazonEmailServiceClass = AmazonEmailService;
exports.AmazonEmailService = new AmazonEmailService();
