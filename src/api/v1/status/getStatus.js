'use strict';

const StatusService = require('../../../service/status/statusService.js').StatusService;

function getStatus(req, res, next) {
  return StatusService.getStatus().then(lastCheckedAt => {
    return res.pack({ lastCheckedAt });
  }).catch(next);
}

exports.getStatus = getStatus;
