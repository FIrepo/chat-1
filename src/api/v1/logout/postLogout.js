'use strict';

function postLogout(req, res) {
  req.logout();
  return res.sendStatus(req.user ? 400 : 200);
}

exports.postLogout = postLogout;
