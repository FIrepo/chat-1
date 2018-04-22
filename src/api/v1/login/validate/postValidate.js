'use strict';

const express = require('express');
const Boom = require('boom');
const passport = require('passport');
const CustomStrategy = require('passport-custom');

const UserDao = require('../../../../dal/user/userDao.js').UserDao;
const AuthService = require('../../../../service/auth/authService.js').AuthService;

const router = express.Router();

passport.serializeUser((user, done) => {
  const id = UserDao.getId(user);
  done(null, id);
});

passport.deserializeUser((id, done) => {
  UserDao.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err, null));
});

passport.use(new CustomStrategy((req, done) => {
  const code = req.body.code;
  const phoneNumber = req.body.phoneNumber;
  const sessionCode = req.session.code;
  const sessionPhoneNumber = req.session.phoneNumber;

  AuthService.validateLogin(code, phoneNumber, sessionCode, sessionPhoneNumber)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
}));

router.post('/', passport.authenticate('custom'), (req, res, next) => {
  if (!req.user) {
    return next(Boom.unauthorized('failed to authenticate'));
  }
  return res.pack();
});

exports.router = router;
