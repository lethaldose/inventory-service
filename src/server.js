'use strict';

const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const config  = require('./config');
const log 		= require('./log');
const routes  = require('./routes');
const verifyToken = require('./middleware/verify-token');


exports.create = () => {
  const server = restify.createServer({
    name: config.name
  });

  server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
  server.use(restifyPlugins.acceptParser(server.acceptable));
  server.use(restifyPlugins.queryParser({ mapParams: true }));
  server.use(verifyToken);

  server.on('uncaughtException', (req, res, route, {name, message, inner, stack}) => {
    const error = {name, message, inner, stack};
    log.error(error);
    res.send(503, new restify.InternalError('Service not available'));
  });

  routes.create(server);
  server.listen(config.port);
  return server;
};
