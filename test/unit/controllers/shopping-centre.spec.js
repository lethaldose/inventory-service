'use strict';

const sinon = require('sinon');
const controller = require(`${global.SRC}/controllers/shopping-centre`);

describe('Controller: ShoppingCentre', () => {

  let  request, fakeResponse, fakeNext;

  beforeEach(() => {
    request = {};
    fakeResponse = { send: sinon.stub() };
    fakeNext = sinon.stub();
  });

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

    it('should create a new shopping centre', () => {
      request.body = {
        name: 'Westfield',
        address: {
          streetNumber: '11',
          streetName: 'Victoria',
          suburb: 'Chatswood',
          postcode: 2065,
          state: 'NSW',
          country: 'AUS'
        }
      };
      let shoppingCentreDetails = {};

      controller.create({}, fakeResponse, fakeNext);
      fakeResponse.send.should.have.been.calledWith(201, shoppingCentreDetails);
      fakeNext.should.have.been.called();
    });

  });

});
