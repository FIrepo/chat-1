'use strict';

const expect = require('chai').expect;

const getAgent = require('../../../util/agent.js').getAgent;
const api = require('../../../util/api.js').api;
const UserDao = require('../../../../dal/user/userDao.js').UserDao;

describe('get users tests', () => {
  before(function() {
    return getAgent().then(agent => {
      this.agent = agent;
      return UserDao.remove({});
    })
    .then(() => {
      return UserDao.create({
        username: 'test user1',
        phoneNumber: '12345678',
      })
      .then((user) => {
        this.user1 = user;
        return this.user1;
      })
      .then(() => {
        return UserDao.create({
          username: 'Roberta Mazzetti',
          phoneNumber: '12345678',
        }).then((user) => {
          this.user2 = user;
          return this.user2;
        });
      });
    });
  });

  it('should get one user by username!', function() {
    return this.agent.get(api.users('test us')).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('count', 1);
      expect(res.body.data.users[0]).to.have.property('username', this.user1.username);
    });
  });

  it('should get two user by phoneNumber!', function() {
    return this.agent.get(api.users('123456')).expect(200)
    .then((res) => {
      expect(res.body).to.be.ok;
      expect(res.body.data).to.have.property('count', 2);
    });
  });

  it('should not get user!', function() {
    return this.agent.get(api.users('non existent')).expect(200)
      .then((res) => {
        expect(res.body).to.be.ok;
        expect(res.body.data).to.have.property('count', 0);
        expect(res.body.data.users.length).to.eql(0);
      });
  });
});
