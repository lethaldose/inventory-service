'use strict';

const _ = require('lodash');
const restifyErrors = require('restify-errors');
const log = require('../log');
const db = require('../models/db');
const Asset = db.Asset;
const AssetResponse = require('../schemas/asset-response');

exports.create = function(req, res, next) {
  let reqAttributes = req.body;

  return Asset.create(reqAttributes)
  .then ( (newAsset) => {
    res.send(201, AssetResponse.transform(newAsset));
    next();
  }).catch( (err) => {
    log.error(err);
    let errorMsg = `Error creating new Asset ${err.message}`;
    next(new restifyErrors.BadRequestError({message: errorMsg}));
  });
};

exports.update = function(req, res, next) {
  let id = req.params.id;
  let reqAttributes = req.body;

  return Asset.findById(id)
  .then( (assetDetails) => {
    if(_.isEmpty(assetDetails)) {
      next(new restifyErrors.NotFoundError());
      return;
    }
    return assetDetails.update(reqAttributes);
  })
  .then ( (assetDetails) => {
    res.send(200, AssetResponse.transform(assetDetails));
    next();
  }).catch( (err) => {
    log.error(err);
    let errorMsg = `Error updating Asset ${err.message}`;
    next(new restifyErrors.BadRequestError({message: errorMsg}));
  });
};


exports.get = function(req, res, next) {
  let id = req.params.id;

  return Asset.findById(id)
  .then( (assetDetails) => {
    if(_.isEmpty(assetDetails)) {
      next(new restifyErrors.NotFoundError());
      return;
    }

    res.send(200, AssetResponse.transform(assetDetails));
    next();
  }).catch( (err) => {
    log.error(err);
    next(new restifyErrors.NotFoundError());
  });
};

