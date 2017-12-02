'use strict';

const sinon = require('sinon');
const controller = require(`${global.SRC}/controllers/shopping-centre`);

describe('Controller: ShoppingCentre', () => {

  let  req, fakeResponse, fakeNext;

  beforeEach(() => {
    fakeResponse = { send: sinon.stub() };
    fakeNext = sinon.stub();
  });

  describe('get', () => {

    it('should return a shopping centre for an id', () => {
      let shoppingCentreDetails = {name: 'Westfield'};
      controller.get({}, fakeResponse, fakeNext);
      fakeResponse.send.should.have.been.calledWith(200, shoppingCentreDetails);
      fakeNext.should.have.been.called();
    });

  });

});
