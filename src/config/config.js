'use strict';

require('dotenv').config();

const path = require('path');

const convict = require('convict');

const conf = convict({
  env: {
    doc: 'The applicaton environment.',
    format: ['prod', 'dev', 'test', 'stage'],
    default: 'dev',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
  },
  db: {
    host: {
      doc: 'Address of the database.',
      format: String,
      default: 'localhost',
      env: 'DB_HOST',
    },
    port: {
      doc: 'Port of the database.',
      format: 'port',
      default: 27017,
      env: 'DB_PORT',
    },
    name: {
      doc: 'Name of the database.',
      format: String,
      default: 'parashout',
      env: 'DB_NAME',
    },
  },
  mqtt: {
    name: {
      doc: 'Name of the MQTT server.',
      format: String,
      default: 'mqtt',
      env: 'MQTT_NAME',
    },
    host: {
      doc: 'Host of the MQTT server.',
      format: String,
      default: 'localhost',
      env: 'MQTT_HOST',
    },
    port: {
      doc: 'Port of the MQTT server.',
      format: 'port',
      default: 1883,
      env: 'MQTT_PORT',
    },
    pubsubCollection: {
      doc: 'Db collection of the MQTT server.',
      format: String,
      default: 'mqtt-log',
      env: 'MQTT_COLLECTION',
    },
  },
  amazon: {
    aws: {
      accessKeyId: {
        doc: 'Amazon access key',
        format: String,
        default: 'AMAZON_ACCESS_KEY',
        env: 'AMAZON_ACCESS_KEY',
      },
      secretAccessKey: {
        doc: 'Amazon secret access key',
        format: String,
        default: 'AMAZON_SECRET_ACCESS_KEY',
        env: 'AMAZON_SECRET_ACCESS_KEY',
      },
      region: {
        doc: 'Amazon region',
        format: String,
        default: 'AMAZON_REGION',
        env: 'AMAZON_REGION',
      },
    },
    emailFrom: {
      doc: 'Amazon email sender',
      format: String,
      default: 'AMAZON_SNS_EMAIL_FROM',
      env: 'AMAZON_SNS_EMAIL_FROM',
    },
  },
  emailService: {
    doc: 'Transporter for email service',
    format: ['amazon', 'stub'],
    default: 'amazon',
    env: 'EMAIL_SERVICE',
  },
  pushService: {
    doc: 'Push notification service',
    format: ['amazon', 'stub'],
    default: 'amazon',
    env: 'PUSH_SERVICE',
  },
  smsService: {
    doc: 'SMS service',
    format: ['amazon', 'stub'],
    default: 'amazon',
    env: 'SMS_SERVICE',
  },
});

const env = conf.get('env');
conf.loadFile(path.normalize(`${__dirname}/${env}.json`));

conf.validate({
  strict: true,
});

const config = conf.getProperties();

exports.config = config;
