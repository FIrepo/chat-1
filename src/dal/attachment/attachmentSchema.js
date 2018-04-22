'use strict';

const mongoose = require('../dal.js').mongoose;

const attachmentSchema = new mongoose.Schema({
  url: String,
  mimeType: String,
  fileName: String,
});

exports.attachmentSchema = attachmentSchema;
