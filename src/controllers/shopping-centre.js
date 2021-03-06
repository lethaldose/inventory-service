'use strict';

const _ = require('lodash');
const restifyErrors = require('restify-errors');
const log = require('../log');
const db = require('../models/db');
const ShoppingCentre = db.ShoppingCentre;
const AuditLog = db.AuditLog;
const ShoppingCentreResponse = require('../schemas/shopping-centre-response');
const ShoppingCentreRequest = require('../schemas/shopping-centre-request');
const AssetResponse = require('../schemas/asset-response');

exports.create = function(req, res, next) {
  let reqAttributes = ShoppingCentreRequest.parse(req.body);
  let userId = req.userId;

  return ShoppingCentre.createWithAddress(reqAttributes)
  .then ( (newShoppingCentre) => {
    AuditLog.updateShoppingCentre(userId, null , reqAttributes);
    res.send(201, ShoppingCentreResponse.transform(newShoppingCentre));
    next();
  }).catch( (err) => {
    log.error(err);
    let errorMsg = `Error creating shopping Centre ${err.message}`;
    next(new restifyErrors.BadRequestError({message: errorMsg}));
  });
};

exports.get = function(req, res, next) {
  let id = req.params.id;
  return ShoppingCentre.findById(id)
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

exports.getAssets = function(req, res, next) {
  let id = req.params.id;
  let existingShoppingCentre;

  return ShoppingCentre.findById(id)
  .then( (shoppingCentreDetails) => {
    if(_.isEmpty(shoppingCentreDetails)) {
      next(new restifyErrors.NotFoundError());
      return;
    }
    existingShoppingCentre = shoppingCentreDetails;
    return existingShoppingCentre.getAssets();
  }).then( (assetList) => {
    res.send(200, AssetResponse.transformList(assetList));
    next();
  }).catch( (err) => {
    log.error(err);
    next(new restifyErrors.NotFoundError());
  });
};

