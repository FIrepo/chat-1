'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'Block';

const blockSchema = require('./blockSchema.js').blockSchema;
const Block = mongoose.model(name, blockSchema);

exports.name = name;
exports.Block = Block;
