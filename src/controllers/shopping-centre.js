'use strict';

const _ = require('lodash');
const restifyErrors = require('restify-errors');
const log = require('../log');

exports.create = function(req, res, next) {
  let newShoppingCentre = { name: 'Westfield'};
  res.send(201, newShoppingCentre);
  next();
};

exports.get = function(req, res, next) {
  let id = req.params.id
  let shoppingCentreDetails = {name: 'Westfield'};
  res.send(200, shoppingCentreDetails);
  next();
};

