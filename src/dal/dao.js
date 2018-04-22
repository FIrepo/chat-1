'use strict';

class Dao {
  constructor(Model) {
    this.Model = Model;
  }

  getId() {
    throw new Error('not implemented');
  }

  create() {
    throw new Error('not implemented');
  }

  findById() {
    throw new Error('not implemented');
  }

  findOne() {
    throw new Error('not implemented');
  }

  find() {
    throw new Error('not implemented');
  }

  update() {
    throw new Error('not implemented');
  }

  remove() {
    throw new Error('not implemented');
  }

  count() {
    throw new Error('not implemented');
  }

  findAndCount() {
    throw new Error('not implemented');
  }
}

exports.Dao = Dao;
