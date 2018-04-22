'use strict';

const _ = require('lodash');

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;
const shoutOutPrivacySettings = require('./shoutOutPrivacySettings.js').shoutOutPrivacySettings;

const shoutOutSchema = new mongoose.Schema({
  creatorUser: { type: ObjectId, ref: 'User' },
  content: { type: ObjectId, ref: 'Content' },
  expiresAt: Date,
  meterRadius: Number,
  imageUrl: String,
  lngLat: [Number, Number],
  privacy: {
    type: String,
    enum: _.values(shoutOutPrivacySettings),
    default: 'EVERYONE',
  },

})
.virtual('likeCount')
.virtual('commentCount');

exports.shoutOutSchema = shoutOutSchema;
