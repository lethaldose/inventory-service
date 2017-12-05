'use strict';

const sinon = require('sinon');

const db = require(`${global.SRC}/models/db`);
const ShoppingCentre = db.ShoppingCentre;
const Asset = db.Asset;

describe('Model:: Asset',  function() {

  let createDummyShoppingCentre = () => {
    let attributes = {
      name: 'Foo mall',
      description: 'very good',
      Address: {
        streetName: 'hunter st',
        streetNumber: '100',
        suburb: 'Sydney',
        state: 'NSW',
        country: 'AUS',
        postCode: 7870
    }};

    return ShoppingCentre.create(attributes,  {include: [ db.Address] });
  };

  let existingShoppingCentre;

  beforeEach(function(done) {

    let deleteShoppingCentre = ShoppingCentre.destroy({
      where: {},
      truncate: true
    });

    let deleteAsset = Asset.destroy({
      where: {},
      truncate: true
    });

    Promise.all([deleteAsset, deleteShoppingCentre]).then(() => {
      return createDummyShoppingCentre();
    }).then( (data) => {
      existingShoppingCentre = data;
      done();
    });

  });

  it('should create a asset',  function(done) {
    let attributes = {
      name: 'Asset1',
      ShoppingCentreId: existingShoppingCentre.id,
      status: 'active',
      dimensions: {
        height: 55,
        width: 47,
        unit: 'cm'
      },
      location: {
        floor: 2,
        mainCorridor: true,
        isFoodCourt: false,
        nearShop: true,
        shopName: 'Rebel',
        gateNumber: 'A-1'
      }
    };

    Asset.create(attributes)
    .then(function(newAsset) {
      newAsset.id.should.be.Number();
      newAsset.dimensions.should.have.properties(['height', 'width', 'unit'])
      newAsset.location.should.have.properties(['floor', 'mainCorridor', 'isFoodCourt', 'nearShop', 'shopName', 'gateNumber'])
      done();
    }).catch(done);

  });

});