'use strict';

const Dao = require('./dao.js').Dao;

class MongooseDao extends Dao {
  getId(instance) {
    return instance._id;
  }

  create(data) {
    return this.Model.create(data).then(instance => instance.toJSON());
  }

  findById(id) {
    return this.Model.findById(id).lean();
  }

  findOne(condition) {
    return this.Model.findOne(condition).lean();
  }

  find(condition, { limit = 10, skip = 0 } = {}) {
    return this.Model.find(condition).limit(limit).skip(skip).lean();
  }

  update(condition, update) {
    return this.Model.update(condition, update).lean();
  }

  updateById(_id, update) {
    return this.update({ _id }, update);
  }

  remove(condition) {
    return this.Model.remove(condition).lean();
  }

  count(condition) {
    return this.Model.count(condition);
  }

  findAndCount(condition, { limit, skip }) {
    return Promise.all([
      this.count(condition),
      this.find(condition, { limit, skip }),
    ]).then(([count, items]) => {
      console.log(count);
      return { count, items };
    });
  }
}

exports.MongooseDao = MongooseDao;
