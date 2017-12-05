'use strict';

const _ = require('lodash');
const restifyErrors = require('restify-errors');
const log = require('../log');
const db = require('../models/db');
const ShoppingCentre = db.ShoppingCentre;
const ShoppingCentreResponse = require('../schemas/shopping-centre-response');
const ShoppingCentreRequest = require('../schemas/shopping-centre-request');

exports.create = function(req, res, next) {
  let reqAttributes = ShoppingCentreRequest.parse(req.body);

  return ShoppingCentre.createWithAddress(reqAttributes)
  .then ( (newShoppingCentre) => {
    res.send(201, ShoppingCentreResponse.transform(newShoppingCentre));
    next();
  }).catch( (err) => {
    log.error(err);
    let errorMsg = `Error creating shopping Centre ${err.message}`;
    next(new restifyErrors.BadRequestError({message: errorMsg}));
  });
};

exports.get = function(req, res, next) {
  let id = req.params.id
  ShoppingCentre.findById(id)
  .then( (shoppingCentreDetails) => {
    if(_.isEmpty(shoppingCentreDetails)) {
      next(new restifyErrors.NotFoundError());
      return;
    }

    res.send(200, ShoppingCentreResponse.transform(shoppingCentreDetails));
    next();
  }).catch( (err) => {
    log.error(err);
    next(new restifyErrors.NotFoundError());
  });
};

