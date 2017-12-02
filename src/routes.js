'use strict';

const restifyErrors = require('restify-errors');
const s = require('strummer');

const shoppingCentreController = require('./controllers/shopping-centre');
const schema = require('./schemas/schema');
const schemaValidator = require('./schemas/schema-validator');

exports.create = function(server) {

  server.post('/shopping-centre',
    schemaValidator.validate({body: schema.SHOPPING_CENTRE_REQUEST}),
    shoppingCentreController.create);

  server.get('/shopping-centre',
    schemaValidator.validate({params: schema.SHOPPING_CENTRE_ID}),
    shoppingCentreController.get);

  server.get('/shopping-centre/:id', (req, res, next) => {
    res.send({});
    next();
  });

  server.put('/shopping-centre/:id', (req, res, next) => {
    res.send(200, {});
    next();
  });

  server.del('/shopping-centre/:id', (req, res, next) => {
    res.send(204);
    next();
  });
};
