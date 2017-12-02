'use strict';

const log = require('../log');

exports.create = function(req, res, next) {
  let newShoppingCentre = { name: 'Westfield'};
  res.send(201, newShoppingCentre);
  next();
};

exports.get = function(req, res, next) {
  let shoppingCentreDetails = {name: 'Westfield'};
  res.send(200, shoppingCentreDetails);
  next();
};

