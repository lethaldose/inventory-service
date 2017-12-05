'use strict';

const _ = require('lodash');

exports.parse = (requestParams) => {
  let modelAttributes = _.extend({}, requestParams);
  modelAttributes.Address = modelAttributes.address;
  delete(modelAttributes.address);
  return modelAttributes;
};