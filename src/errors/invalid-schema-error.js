'use strict';

const HTTPErrors = require('http-custom-errors');
const util = require('util');

function InvalidSchemaError(fields) {
  this.message = 'Invalid Request Schema';
  this.fields = fields;
}

util.inherits(InvalidSchemaError, HTTPErrors.BadRequestError);

module.exports = InvalidSchemaError;
