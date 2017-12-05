'use strict';

const shoppingCentreController = require('./controllers/shopping-centre');
const assetsController = require('./controllers/asset');
const schema = require('./schemas/schema');
const schemaValidator = require('./schemas/schema-validator');

exports.create = function(server) {

  server.post('/shopping-centres',
    schemaValidator.validate({body: schema.SHOPPING_CENTRE_REQUEST}),
    shoppingCentreController.create );

  server.get('/shopping-centres/:id',
    schemaValidator.validate({params: schema.SHOPPING_CENTRE_ID}),
    shoppingCentreController.get);

  server.post('/assets',
    schemaValidator.validate({body: schema.CREATE_ASSET_REQUEST}),
    assetsController.create );

  server.get('/assets/:id', assetsController.get);
};
