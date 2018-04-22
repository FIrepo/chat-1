'use strict';

const co = require('co');

const StatusDao = require('../../dal/status/statusDao.js').StatusDao;

class StatusService {
  static getStatus() {
    return co(function * coGetStatus() {
      let status = yield StatusDao.findOne();

      if (!status) {
        status = yield StatusDao.create();
      }

      const id = StatusDao.getId(status);
      const updatedStatus = yield StatusDao.updateLastCheckedAtById(id);

      return updatedStatus.lastCheckedAt;
    });
  }
}

exports.StatusService = StatusService;
