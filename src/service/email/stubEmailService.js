'use strict';

const nodemailer = require('nodemailer');
const stubTransport = require('nodemailer-stub-transport');

const transport = nodemailer.createTransport(stubTransport());
const EmailService = require('./emailService.js').EmailService;

class StubEmailService extends EmailService {
  sendMail(data) {
    const emailData = {
      message: data.text,
    };
    return transport.sendMail(emailData);
  }
}

exports.StubEmailServiceClass = StubEmailService;
exports.StubEmailService = new StubEmailService();
