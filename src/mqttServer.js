'use strict';

const mosca = require('mosca');
const winston = require('winston');

const config = require('./config/config.js').config;
const ChatMessageService = require('./service/chatMessage/chatMessageService.js').ChatMessageService;

let mqttServ;

function start() {
  if (mqttServ) {
    return Promise.resolve(mqttServ);
  }

  return new Promise(resolve => {
    mqttServ = new mosca.Server({
      port: config.mqtt.port,
      backend: {
        type: 'mongo',
        url: `mongodb://${config.db.host}:${config.db.port}/${config.mqtt.name}`,
        pubsubCollection: config.mqtt.pubsubCollection,
        mongo: {},
      },
    });
    mqttServ.on('published', (data, client) => {
      ChatMessageService.saveMqttMessage({
        data,
        client,
      })
      .catch((err) => {
        winston.info('MQTT service event, not user action. - Data:', err.message);
      });
    });
    winston.info(`MQTT server started on port ${config.mqtt.port}.`);
    return resolve(mqttServ);
  });
}

exports.start = start;
