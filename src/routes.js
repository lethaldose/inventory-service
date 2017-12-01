'use strict';

const httpErrors = require('restify-errors');

exports.create = function(server) {

  server.post('/shopping-centre', (req, res, next) => {
    res.send(201);
    next();
  });

  server.get('/shopping-centre', (req, res, next) => {
    res.send({});
    next();
  });

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
