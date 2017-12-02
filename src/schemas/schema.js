'use strict';

const s = require('strummer');

exports.SHOPPING_CENTRE_REQUEST = s({
  name: 'string',
  address: {
    streetNumber: 'string',
    streetName: 'string',
    streetType: 'string',
    suburb: 'string',
    postcode: /^\d{4}$/,
    state: s.enum({
      values: ['NSW', 'ACT', 'QLD', 'VIC', 'WA', 'SA', 'TAS']
    }),
    country: s.value('AUS')
  }
});
