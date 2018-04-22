'use strict';

const co = require('co');
const Boom = require('boom');

const UserDao = require('../../dal/user/userDao.js').UserDao;
const SmsService = require('../sms/smsFactory.js').SmsServiceInstance;

class AuthService {
  login(phoneNumber) {
    return co(function * coLogin() {
      const code = SmsService.createCode();
      yield SmsService.sendSms(code, phoneNumber);

      const user = yield UserDao.findByPhoneNumber(phoneNumber);
      if (user) {
        return { isNewUser: false, code };
      }

      yield UserDao.create({
        phoneNumber,
      });

      return { isNewUser: true, code };
    });
  }

  validateLogin(code, phoneNumber, sessionCode, sessionPhoneNumber) {
    return co(function * coValidateLogin() {
      if (phoneNumber !== sessionPhoneNumber) {
        throw Boom.badRequest('phone number mismatch');
      }
      if (code !== sessionCode) {
        throw Boom.badRequest('code mismatch');
      }

      const user = yield UserDao.findByPhoneNumber(phoneNumber);
      if (!user) {
        throw Boom.notFound(`user with phone number ${phoneNumber}`);
      }

      return user;
    });
  }
}

exports.AuthServiceClass = AuthService;
exports.AuthService = new AuthService();
