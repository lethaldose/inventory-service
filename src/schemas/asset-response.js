'use strict';

const _ = require('lodash');

exports.transform = (assetModel) => {
  let response  = _.omit(assetModel.toJSON(), ['updatedAt', 'createdAt']);
  return response;
};

exports.transformList = (assetList) => {
  let responseList = assetList.map((asset) => {
    return exports.transform(asset);
  });
  return responseList;
};