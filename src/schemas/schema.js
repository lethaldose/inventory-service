'use strict';

const s = require('strummer');

exports.SHOPPING_CENTRE_REQUEST = s({
  name: 'string',
  description: s.optional('string'),
  address: {
    streetNumber: 'string',
    streetName: 'string',
    suburb: 'string',
    postCode: s.number({min: 1000, max: 9999}),
    state: s.enum({
      values: ['NSW', 'ACT', 'QLD', 'VIC', 'WA', 'SA', 'TAS']
    }),
    country: s.value('AUS')
  }
});


exports.SHOPPING_CENTRE_ID = s({id: 'string'});


exports.CREATE_ASSET_REQUEST = s({
  name: 'string',
  status: s.enum({
    values: ['active', 'inactive']
  }),

  screenDimensions: {
    height: 'number',
    width: 'number',
    unit: s.enum({
      values: ['cm', 'inch']
    })
  },

  adSpotLength: s.optional('number'),
  maxAdvertisers: s.optional('number'),
  maxAdLoopTime: s.optional({
    value: 'number',
    unit: 'string'
  }),
  dailyFootfall: s.optional('number'),
  beaconRFIDEnabled: s.optional('boolean'),
  wallMounted: s.optional('boolean'),
  interactive: s.optional('boolean'),
  floorStanding: s.optional('boolean'),

  location: {
    floor: 'string',
    description: s.optional('string'),
    mainCorridor: s.optional('boolean'),
    isParking: s.optional('boolean'),
    isFoodCourt: s.optional('boolean'),
    nearShop: s.optional('boolean'),
    shopName: s.optional('string'),
    shopNumber: s.optional('string'),
    nearEntryGate: s.optional('boolean'),
    nearExitGate: s.optional('boolean'),
    gateNumber: s.optional('string'),
    pillarNumber: s.optional('string')
  }
});
