'use strict';

const _ = require('lodash');

const MongooseDao = require('../mongooseDao.js').MongooseDao;
const ShoutOut = require('./shoutOutModel.js').ShoutOut;

class ShoutOutDao extends MongooseDao {
  saveShoutOut(userId, queryObject) {
    const shoutOut = new ShoutOut({
      creatorUser: userId,
      //media: queryObject.media,
      expiresAt: new Date(),
      meterRadius: queryObject.meterRadius,
      //image: queryObject.image,
      location: {
        type: queryObject.location.type,
        coordinates: [queryObject.location.coordinates[0], queryObject.location.coordinates[1]], //lng, lat order
        googleMapId: queryObject.googleMapId,
        address: queryObject.address,
      },
      privacy: 'everyone',
    });
    return shoutOut.save()
    .then(created => {
      return created ? shoutOut.toJSON() : null;
    });
  }

  findNearbyShoutOuts(lat, lng, meterRadius) {
    return ShoutOut.find({
      location:
        { $near:
          { $geometry: { type: 'Point', coordinates: [lat, lng] },
            $maxDistance: meterRadius,
          },
        },
    }, {});
  }
}
exports.ShoutOutDaoClass = ShoutOutDao;
exports.ShoutOutDao = new ShoutOutDao(ShoutOut);
