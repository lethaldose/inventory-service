'use strict';

module.exports = {
	name: 'inventory-service',
	port: process.env.PORT || 3000,
  secret: 'j92n5ddfR361QCxahu5mdOFL9jGfWyiYAmW4CmJZXgUw',
  tokenExpirySeconds: 3600,
  salt: 8,
  unAuthenticatedUrls: ['/authenticate']
};
