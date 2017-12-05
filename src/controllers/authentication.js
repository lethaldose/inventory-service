'use strict';

const jwt = require('jsonwebtoken');
const restifyErrors = require('restify-errors');

const log = require('../log');
const config = require('../config');
const db = require('../models/db');
const User = db.User;

exports.authenticate = function(req, res, next) {
  return User.authenticate(req.body.username, req.body.password).then( (user) => {
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.tokenExpirySeconds
    });
    res.send(200, {token: token });
    next();
  }).catch( (err) => {
    log.error(err);
    next(new restifyErrors.UnauthorizedError());
  });

};
