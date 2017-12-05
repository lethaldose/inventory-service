'use strict';

const request = require('supertest');
const _ = require('lodash');

const server = require(`${global.SRC}/server`);
const db = require(`${global.SRC}/models/db`);
const ShoppingCentre = db.ShoppingCentre;
const Asset = db.Asset;

describe('INTEGRATION::Asset Controller', () => {
  let app;
  let existingShoppingCentre;

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


  before(() => {
    app = server.create();
  });

  after((done) => app.close(done));

  let userParams = global.IntegrationTestUser;
  let authToken;

  beforeEach((done)=> {
    request(app)
    .post('/authenticate')
    .send(userParams)
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      authToken = res.body.token;
      done();
    });
  });


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

  const createDummyAsset = () => {
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
      }
    };

    return Asset.create(attributes);
  };

  describe('Get asset', () => {
    let existingAsset;

    beforeEach( (done) => {

      createDummyAsset().then((data)=>{
        existingAsset = data;
        done();
      });

    });

    it('should get by id', (done) => {
      request(app)
      .get(`/assets/${existingAsset.id}`)
      .set('x-access-token', authToken)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        let assetResponse = res.body;
        assetResponse.id.should.eql(existingAsset.id);
        assetResponse.name.should.eql(existingAsset.name);
        assetResponse.dimensions.should.eql(existingAsset.dimensions);
        assetResponse.location.should.eql(existingAsset.location);
        done();
      });
    });

  it('should give error for invalid id', (done) => {
      request(app)
      .get('/assets/999189903')
      .set('x-access-token', authToken)
      .expect(404)
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
    });

  });

  describe('Create asset', () => {

    it('should create asset', (done) => {
      let requestParams = {
        name: 'Asset-Super',
        ShoppingCentreId: existingShoppingCentre.id,
        status: 'active',
        dimensions: {
          height: 55,
          width: 47,
          unit: 'cm'
        },
        location: {
          floor: '2',
        }
      };

      request(app)
      .post('/assets/')
      .set('x-access-token', authToken)
      .send(requestParams)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.id.should.be.a.Number();
        let responseAttrs = _.omit(res.body, 'id');
        responseAttrs.should.eql(requestParams);
        done();
      });
    });

  });

  describe('Update asset', () => {

    let existingAsset;

    beforeEach( (done) => {

      createDummyAsset().then((data)=>{
        existingAsset = data;
        done();
      });

    });

    it('should set asset to inactive', (done) => {
      let requestParams = {
        status: 'inactive'
      };

      request(app)
      .put(`/assets/${existingAsset.id}`)
      .set('x-access-token', authToken)
      .send(requestParams)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.status.should.eql('inactive');
        done();
      });
    });

  });

});
