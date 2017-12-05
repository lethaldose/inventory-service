'use strict';

const request = require('supertest');
const _ = require('lodash');

const server = require(`${global.SRC}/server`);
const db = require(`${global.SRC}/models/db`);
const ShoppingCentre = db.ShoppingCentre;

describe('INTEGRATION::ShoppingCentre Controller', () => {
  let app;

  before(() => {
    app = server.create();
  });

  after((done) => app.close(done));

  beforeEach(function(done) {
    ShoppingCentre.destroy({
      where: {},
      truncate: true
    }).then(done);
  });

  describe('Get shopping centre', () => {

    let existingShoppingCentre, requestAttrs;

    beforeEach( (done) => {
      requestAttrs = {
        name: 'Westfield',
        description: 'very nice place',
        Address: {
          streetNumber: '11',
          streetName: 'Victoria',
          suburb: 'Chatswood',
          postCode: 2065,
          state: 'NSW',
          country: 'AUS'
        }
      };

      ShoppingCentre.createWithAddress(requestAttrs).then((data) => {
        existingShoppingCentre = data;
        done();
      });
    });

    it('should get by id', (done) => {
      request(app)
      .get(`/shopping-centres/${existingShoppingCentre.id}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        let shoppingCentre = res.body;
        shoppingCentre.id.should.eql(existingShoppingCentre.id);
        shoppingCentre.name.should.eql(existingShoppingCentre.name);
        shoppingCentre.address.should.eql(requestAttrs.Address);
        done();
      });
    });

  it('should give error for invalid id', (done) => {
      request(app)
      .get('/shopping-centres/999189903')
      .expect(404)
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
    });


  });

  describe('Create shopping centre', () => {

    it('should create shopping centre', (done) => {
      let requestParams = {
        name: 'Westfield',
        description: 'very nice place',
        address: {
          streetNumber: '11',
          streetName: 'Victoria',
          suburb: 'Chatswood',
          postCode: 2065,
          state: 'NSW',
          country: 'AUS'
        }
      };


      request(app)
      .post('/shopping-centres/')
      .send(requestParams)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);

        res.body.id.should.be.a.Number();
        let expectedAttrs = _.extend(requestParams, {
          id: res.body.id,
          links: {
            assets: `/shopping-centres/${res.body.id}/assets`
          }
        });
        res.body.should.eql(expectedAttrs);
        done();
      });
    });


    it('should give error if required params are missing', (done) => {
      let requestParams = {
        description: 'very nice place',
      };

      let errorResponse = {
        'fields': [
          {
            'message': 'should be a string',
            'path': 'name'
          },
          {
            'message': 'should be an object',
            'path': 'address'
          }
        ],
        'message': 'Invalid Request Schema',
        'statusCode': 400
      };

      request(app)
      .post('/shopping-centres/')
      .send(requestParams)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        res.body.should.eql(errorResponse);
        done();
      });
    });

  });

});
