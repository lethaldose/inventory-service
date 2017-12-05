const jwt = require('jsonwebtoken');
const restifyErrors = require('restify-errors');
const _ = require('lodash');
const config = require('../config');

function verifyToken(req, res, next) {
  if(_.includes(config.unAuthenticatedUrls, req.url)){
    return next();
  }

  let token = req.headers['x-access-token'];

  if (!token) {
    return next(new restifyErrors.UnauthorizedError());
  }

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
      return next(new restifyErrors.UnauthorizedError());
    }
    req.userId = decoded.id;
    return next();
  });
}

module.exports = verifyToken;