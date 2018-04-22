'use strict';

const mqtt = require('mqtt');
const winston = require('winston');

const config = require('./config/config.js').config;

let mqttHelper;

function start() {
  if (mqttHelper) {
    return Promise.resolve(mqttHelper);
  }

  return new Promise((resolve, reject) => {
    mqttHelper = mqtt.connect(`mqtt://${config.mqtt.host}:${config.mqtt.port}`);
    mqttHelper.on('connect', () => {
      winston.info(`MQTT helper is listening on port ${config.mqtt.port}.`);
      return resolve(mqttHelper);
    });
    mqttHelper.on('error', () => {
      winston.err('MQTT helper broke.');
      return reject(mqttHelper);
    });
  });
}

function publish(topic, payload) {
  mqttHelper.publish(topic, payload);
}

exports.start = start;
exports.publish = publish;
