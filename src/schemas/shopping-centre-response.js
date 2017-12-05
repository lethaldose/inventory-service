'use strict';

const _ = require('lodash');


exports.transform = (shoppingCentreModel) => {
  let response  = _.omit(shoppingCentreModel.toJSON(),
    ['updatedAt', 'createdAt', 'Address.createdAt',
    'Address.updatedAt', 'Address.ShoppingCentreId', 'Address.id']);
  response.address = response.Address;

  delete(response.Address);
  return response;
};