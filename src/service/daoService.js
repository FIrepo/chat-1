'use strict';

const Boom = require('boom');

class DaoService {
  constructor(Dao) {
    this.Dao = Dao;
  }

  create(data) {
    return this.Dao.create(data);
  }

  getById(id) {
    return this.Dao.findById(id).then(instance => {
      if (!instance) {
        throw Boom.notFound(`with id: ${id} (${this.Dao.constructor.name})`);
      }
      return instance;
    });
  }

  update(condition, update) {
    return this.Dao.update(condition, update);
  }

  updateById(_id, update) {
    return this.update({ _id }, update);
  }

  remove(condition) {
    return this.Dao.remove(condition);
  }
}

exports.DaoService = DaoService;
