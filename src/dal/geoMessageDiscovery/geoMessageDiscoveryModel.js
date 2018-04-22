'use strict';

const mongoose = require('../dal.js').mongoose;
const name = 'GeoMessageDiscovery';

const geoMessageDiscoverySchema = require('./geoMessageDiscoverySchema.js').geoMessageDiscoverySchema;
const GeoMessageDiscovery = mongoose.model(name, geoMessageDiscoverySchema);

exports.name = name;
exports.GeoMessageDiscovery = GeoMessageDiscovery;
