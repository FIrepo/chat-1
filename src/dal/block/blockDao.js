'use strict';

const MongooseDao = require('../mongooseDao.js').MongooseDao;
const Block = require('./blockModel.js').Block;

class BlockDao extends MongooseDao {
  blockUser(blockedUserId, blockerUserId) {
    const block = new Block({
      blockerUser: blockerUserId,
      blockedUser: blockedUserId,
      blockedAt: new Date(),
    });

    return block.save()
    .then(createdBlock => {
      return createdBlock ? block.toJSON() : null;
    });
  }

  unblockUser(blockedUserId, blockerUserId) {
    return this.remove({
      blockerUser: blockerUserId,
      blockedUser: blockedUserId,
    });
  }

  findBlocked(blockerUserId, { limit, skip }) {
    return Promise.all([
      this.count({
        blockerUser: blockerUserId,
      }),

      this.find({
        blockerUser: blockerUserId,
      })
      .populate('blockedUser')
      .limit(limit)
      .skip(skip)
      .then(blocks => {
        return blocks.map(block => block.blockedUser);
      }),
    ])
    .then(([count, blockedUsers]) => ({ count, blockedUsers })
  );
  }
  countBlockersById(blockedUserId, blockerUserId) {
    return this.count({
      $and: [{
        blockerUser: blockerUserId,
      }, {
        blockedUser: blockedUserId,
      }],
    });
  }
}

exports.BlockDaoClass = BlockDao;
exports.BlockDao = new BlockDao(Block);
