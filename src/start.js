'use strict';

const restify = require('restify');
const restifyPlugins = require('restify-plugins');

const server  = require('./server');
const log     = require('./log');

process.on('uncaughtException', function (err) {
  log.error('Uncaught exception, shutting down the server');
  log.error(err);
  process.exit(1);
});

process.on('unhandledRejection', function (err) {
  log.error('UNHANDLED REJECTION', err);
});


let app = server.create();
log.info(`Inventory Service Started:: listening at ${app.url}`);