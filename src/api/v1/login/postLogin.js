'use strict';

const AuthService = require('../../../service/auth/authService.js').AuthService;

const codeBuffer = [];

function postLogin(req, res, next) {
  const phoneNumber = req.body.phoneNumber;

  return AuthService.login(phoneNumber)
    .then(({ isNewUser, code }) => {
      req.session.code = code;
      req.session.phoneNumber = phoneNumber;

      if (isNewUser) {
        return res.pack.created();
      }
      return res.pack();
    })
    .catch(next);
}

exports.postLogin = postLogin;
exports.codeBuffer = codeBuffer;
