'use strict';

const aws = require('aws-sdk');

const PushService = require('./pushService.js').PushService;
const config = require('../../config/config.js').config.amazon.aws;
const sns = new aws.SNS();
const sqs = new aws.SQS();
aws.config.update(config);

class AmazonPushService extends PushService {
  createTopic(data) {
    return sns.createTopic({
      'Name': data.name,
    }).promise();
  }

  createQueue(data) {
    return sqs.createQueue({
      'QueueName': data.name,
    }).promise();
  }

  getQueueAttributes(data) {
    return sqs.getQueueAttributes({
      'QueueUrl': data.QueueUrl,
      'AttributeNames': ['QueueArn'],
    }).promise();
  }

  createSubscribtion(data) {
    return sns.subscribe({
      'TopicArn': data.TopicArn,
      'Protocol': 'sqs',
      'Endpoint': data.QueueArn,
    });
  }

  allowTopic(data) {
    const attributes = {
      Version: '2008-10-17',
      Id: data.QueueArn + '/SQSDefaultPolicy',
      Statement: [{
        Sid: 'Sid' + new Date().getTime(),
        Effect: 'Allow',
        Principal: {
          AWS: '*',
        },
        Action: 'SQS:SendMessage',
        Resource: data.QueueArn,
        Condition: {
          ArnEquals: {
            'aws:SourceArn': data.TopicArn,
          },
        },
      },
    ],
    };

    return sqs.setQueueAttributes({
      'QueueUrl': data.QueueUrl,
      'Attributes': {
        'Policy': JSON.stringify(attributes),
      },
    }).promise();
  }

  sendPush(data) {
    const params = {
      Message: data.Message,
      MessageStructure: 'string',
      TopicArn: data.TopicArn,
      Subject: data.Subject,
    };
    return sns.publish(params).promise();
  }
}

exports.AmazonPushServiceClass = AmazonPushService;
exports.AmazonPushService = new AmazonPushService();
