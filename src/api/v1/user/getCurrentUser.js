'use strict';

function getCurrentUser(req, res) {
  const user = req.user;
  return res.pack({ user });
}

exports.getCurrentUser = getCurrentUser;
