'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const geoMessageDiscoverySchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  message: { type: ObjectId, ref: 'Message' },
  discoveredAt: Date,
});

exports.geoMessageDiscoverySchema = geoMessageDiscoverySchema;
