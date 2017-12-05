'use strict';

const sinon = require('sinon');
const controller = require(`${global.SRC}/controllers/shopping-centre`);
const db = require(`${global.SRC}/models/db`);
var ShoppingCentre = db.ShoppingCentre;

describe('Controller: ShoppingCentre', () => {

  let  request, fakeResponse, fakeNext, sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    request = {};
    fakeResponse = { send: sinon.stub() };
    fakeNext = sinon.stub();
  });

  afterEach(() => sandbox.restore());

  describe('get', () => {

    it('should return a shopping centre for an id', () => {
      let shoppingCentreDetails = {name: 'Westfield'};
      request = {params: {id: '999'}}
      controller.get(request, fakeResponse, fakeNext);
      fakeResponse.send.should.have.been.calledWith(200, shoppingCentreDetails);
      fakeNext.should.have.been.called();
    });

  });

  describe('create', () => {

    afterEach( () => {
      ShoppingCentre.createWithAddress.restore();
    })

    it('should create a new shopping centre', (done) => {
      request.body = {
        name: 'Westfield',
        address: {
          streetNumber: '11',
          streetName: 'Victoria',
          suburb: 'Chatswood',
          postCode: 2065,
          state: 'NSW',
          country: 'AUS'
        }
      };

      let shoppingCentreDetails = {id: "999"};
      sinon.stub(ShoppingCentre, 'createWithAddress').returns(Promise.resolve(shoppingCentreDetails));

      controller.create(request, fakeResponse, fakeNext).then ( () =>  {
        fakeNext.should.have.been.called();
        ShoppingCentre.createWithAddress.should.have.been.calledWith(request.body);
        fakeResponse.send.should.have.been.calledWith(201, shoppingCentreDetails);
        done();
      }).catch(done);
    });

    it('should give an error for bad request', (done) => {
      request.body = {
        name: 'Westfield',
        address: {
          streetNumber: '11',
          streetName: 'Victoria',
          suburb: 'Chatswood',
          postCode: 2065,
          state: 'NSW',
          country: 'AUS'
        }
      };

      sinon.stub(ShoppingCentre, 'createWithAddress')
      .returns(Promise.reject({error: 'invalid req'}));

      controller.create(request, fakeResponse, fakeNext).then ( () =>  {
        ShoppingCentre.createWithAddress.should.have.been.calledWith(request.body);
        fakeNext.should.have.been.calledWithMatch({statusCode: 400});
        done();
      });
    });

  });

});
