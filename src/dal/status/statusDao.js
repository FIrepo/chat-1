'use strict';

const MongooseDao = require('../mongooseDao.js').MongooseDao;
const Status = require('./statusModel.js').Status;

class StatusDao extends MongooseDao {
  updateLastCheckedAtById(id) {
    this.updateById(id, { lastCheckedAt: new Date() });
  }
}

exports.StatusDaoClass = StatusDao;
exports.StatusDao = new StatusDao(Status);
