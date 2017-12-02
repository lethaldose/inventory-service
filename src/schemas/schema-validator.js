const s = require('strummer');
const InvalidSchemaError = require('../errors/invalid-schema-error');

exports.validate = (schemaOptions = {}) => {
  let bodyMatcher = schemaOptions.body ? s(schemaOptions.body) : null;

  return function(req, res, next) {
    let errorFields = bodyMatcher.match(req.body);
    if (errorFields.length > 0) {
      return next(new InvalidSchemaError(errorFields));
    };
  };
};
