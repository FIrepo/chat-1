'use strict';

const _ = require('lodash');

const mongoose = require('../dal.js').mongoose;
const shoutOutPrivacySettings = require('../shoutOut/shoutOutPrivacySettings.js').shoutOutPrivacySettings;
const keepMediaForOptions = require('./keepMediaForOptions.js').keepMediaForOptions;
const mediaDownloadOptions = require('./mediaDownloadOptions.js').mediaDownloadOptions;

const mediaDownloadPhotosOptions = mediaDownloadOptions;
const mediaDownloadVideosOptions = mediaDownloadOptions;

const notificationSchema = {
  someoneFollowed: Boolean,
  someoneChatsWithYou: Boolean,
  shoutOuts: Boolean,
  likes: Boolean,
  comments: Boolean,
};

const mediaSchema = {
  keepMediaFor: {
    type: String,
    enum: _.values(keepMediaForOptions),
    default: keepMediaForOptions.FOREVER,
  },
  downloadPhotos: {
    type: String,
    enum: _.values(mediaDownloadPhotosOptions),
    default: mediaDownloadPhotosOptions.ON,
  },
  downloadVideos: {
    type: String,
    enum: _.values(mediaDownloadVideosOptions),
    default: mediaDownloadVideosOptions.WIFI_ONLY,
  },
};

const privacySchema = {
  showLastOnline: Boolean,
  messageSeen: Boolean,
  defaultShoutOutPrivacy: {
    type: String,
    enum: _.values(shoutOutPrivacySettings),
    default: shoutOutPrivacySettings.EVERYONE,
  },
};

const preferencesSchema = {
  notification: notificationSchema,
  media: mediaSchema,
  privacy: privacySchema,
};

const userSchema = new mongoose.Schema({
  phoneNumber: String,
  profilePictureUrl: String,
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  bio: String,
  lastOnlineAt: Date,
  preferences: preferencesSchema,
});

exports.userSchema = userSchema;
