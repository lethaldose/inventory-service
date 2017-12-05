'use strict';

const sinon = require('sinon');

const db = require(`${global.SRC}/models/db`);
const ShoppingCentre = db.ShoppingCentre;

describe('Model:: ShoppingCentre',  function() {

  let createShoppingCentre = (attributes) => {
    return ShoppingCentre.create(attributes,  {include: [ db.Address] });
  };

  beforeEach(function(done) {
    ShoppingCentre.destroy({
      where: {},
      truncate: true
    }).then(done);
  });

  it('should create a shopping centre',  function(done) {
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

    createShoppingCentre(attributes)
    .then(function(newShoppingCentre) {
      newShoppingCentre.id.should.be.Number();
      done();
    }).catch(done);

  });

  it('should give error for duplicate shopping centre name',  function(done) {
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

    createShoppingCentre(attributes)
    .then( (newShoppingCentre) => {
      newShoppingCentre.id.should.be.Number();
      return createShoppingCentre(attributes);
    })
    .then( () => {
      done('should not create with duplicate name');
    })
    .catch( (err) => {
      err.should.not.be.null;
      err.message.should.eql('Validation error');
      done();
    });

  });

});