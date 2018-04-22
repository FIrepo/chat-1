'use strict';

const expect = require('chai').expect;

require('../../../../config/config.js').config;
const PushService = require('../../../../service/push/pushFactory.js').PushServiceInstance;

describe('push tests', () => {
  it('should create an aws topic arn', function() {
    const response = PushService.createTopic({ name: 'test' });
    expect(response).to.have.property('name');
  });

  it('should create an aws queue url', function() {
    const response = PushService.createQueue({ name: 'test' });
    expect(response).to.have.property('name');
  });

  it('should get the aws queue arn', function() {
    const response = PushService.getQueueAttributes({ QueueUrl: 'test' });
    expect(response).to.have.property('QueueUrl');
  });

  it('should create an aws subscription', function() {
    const response = PushService.createSubscribtion({ TopicArn: 'test', QueueArn: 'test' });
    expect(response).to.have.property('TopicArn');
    expect(response).to.have.property('QueueArn');
  });

  it('should give topic permissions', function() {
    const response = PushService.allowTopic({ QueueUrl: 'test', QueueArn: 'test', TopicArn: 'test' });
    expect(response).to.have.property('TopicArn');
    expect(response).to.have.property('QueueUrl');
    expect(response).to.have.property('QueueArn');
  });

  it('should send a push notification', function() {
    const response = PushService.sendPush({ Message: 'test', TopicArn: 'test', Subject: 'test' });
    expect(response).to.have.property('Message');
    expect(response).to.have.property('TopicArn');
    expect(response).to.have.property('Subject');
  });
});
