'use strict';

const co = require('co');
const Boom = require('boom');

const BlockDao = require('../../dal/block/blockDao.js').BlockDao;
const DaoService = require('../daoService.js').DaoService;

const UserDao = require('../../dal/user/userDao.js').UserDao;

class BlockService extends DaoService {
  blockUser(userIdToBlock, userIdWhoWantsToBlock) {
    return co(function * coBlockUser() {
      const userToBlock = yield UserDao.findById(userIdToBlock);
      if (!userToBlock) {
        throw Boom.notFound(`with id: ${userIdToBlock}`);
      }
      const isBlocked = yield BlockDao.countBlockersById(userIdToBlock, userIdWhoWantsToBlock);
      if (isBlocked > 0) {
        throw Boom.badRequest(`You already blocked: ${userIdToBlock}`);
      }
      return BlockDao.blockUser(userIdToBlock, userIdWhoWantsToBlock);
    });
  }

  unblockUser(blockedUserId, blockerUserId) {
    return BlockDao.unblockUser(blockedUserId, blockerUserId)
    .then(unblocked => {
      return unblocked;
    });
  }

  listBlockedUsers(id, { limit, skip }) {
    return BlockDao.findBlocked(id, { limit, skip })
    .then(({ count, blockedUsers }) => {
      return { count, blockedUsers };
    });
  }
}

exports.BlockServiceClass = BlockService;
exports.BlockService = new BlockService(BlockDao);
