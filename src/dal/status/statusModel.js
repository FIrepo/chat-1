'use strict';

const mongoose = require('../dal.js').mongoose;

const name = 'Status';

const statusSchema = new mongoose.Schema({
  lastCheckedAt: Date,
});

const Status = mongoose.model(name, statusSchema);

exports.name = name;
exports.statusSchema = statusSchema;
exports.Status = Status;
