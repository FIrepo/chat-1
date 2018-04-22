'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'Follow';

const followSchema = require('./followSchema.js').followSchema;
const Follow = mongoose.model(name, followSchema);

exports.name = name;
exports.Follow = Follow;
