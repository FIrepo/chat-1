'use strict';

const mongoose = require('../dal.js').mongoose;

const name = 'User';

const UserSchema = require('./userSchema.js').userSchema;

const User = mongoose.model(name, UserSchema);

exports.name = name;
exports.User = User;
