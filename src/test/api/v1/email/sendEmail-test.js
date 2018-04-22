'use strict';

const expect = require('chai').expect;

const config = require('../../../../config/config.js').config;
const EmailService = require('../../../../service/email/emailFactory.js').EmailServiceInstance;

describe('email tests', () => {
  it('should send an email', function() {
    const emailData = {
      from: config.emailFrom,
      to: 'test@test.test',
      subject: 'Subject',
      text: 'This is the email message for test',
      html: '',
    };
    const request = EmailService.sendMail(emailData);
    return request.then(response => {
      expect(response).to.have.property('response');
    });
  });
});
