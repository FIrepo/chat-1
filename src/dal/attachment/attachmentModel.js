'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'Attachment';

const attachmentSchema = require('./attachmentSchema.js').attachmentSchema;
const Attachment = mongoose.model(name, attachmentSchema);

exports.name = name;
exports.Attachment = Attachment;
