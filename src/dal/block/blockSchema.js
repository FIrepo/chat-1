'use strict';

const mongoose = require('../dal.js').mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const blockSchema = new mongoose.Schema({
  blockerUser: { type: ObjectId, ref: 'User' },
  blockedUser: { type: ObjectId, ref: 'User' },
  blockedAt: Date,
});
exports.blockSchema = blockSchema;
