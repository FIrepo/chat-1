'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'GeoMessageMute';

const geoMessageMuteSchema = require('./geoMessageMuteSchema.js').geoMessageMuteSchema;
const GeoMessageMute = mongoose.model(name, geoMessageMuteSchema);

exports.name = name;
exports.GeoMessageMute = GeoMessageMute;
