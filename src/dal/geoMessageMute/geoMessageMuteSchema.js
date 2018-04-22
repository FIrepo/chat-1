'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const geoMessageMuteSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  target: { type: ObjectId, ref: 'User' },
  muteUntil: Date,
});

exports.geoMessageMuteSchema = geoMessageMuteSchema;
