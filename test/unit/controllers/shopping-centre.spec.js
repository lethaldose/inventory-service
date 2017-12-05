'use strict';

const sinon = require('sinon');
const controller = require(`${global.SRC}/controllers/shopping-centre`);
const db = require(`${global.SRC}/models/db`);
let ShoppingCentre = db.ShoppingCentre;

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

    beforeEach(() => {
      sinon.stub(ShoppingCentre, 'findById')
    })

    afterEach( () => {
      ShoppingCentre.findById.restore();
    })

    it('should return a shopping centre for an id', (done) => {
      let shoppingCentreDetails = {name: 'Westfield', Address: { state: 'NSW'}};
      let shoppingCentreResponse = {name: 'Westfield', address: { state: 'NSW'}};
      let shoppingCentreModelStub = { toJSON: () => {return shoppingCentreDetails; }};
      request = {params: {id: '999'}}
      ShoppingCentre.findById.returns(Promise.resolve(shoppingCentreModelStub));

      controller.get(request, fakeResponse, fakeNext).then( () => {
        fakeResponse.send.should.have.been.calledWith(200, shoppingCentreResponse);
        fakeNext.should.have.been.called();
        done();
      }).catch(done);

    });

  });

  describe('create', () => {

    beforeEach(() => {
      sinon.stub(ShoppingCentre, 'createWithAddress');
    });

    afterEach( () => {
      ShoppingCentre.createWithAddress.restore();
    })

    it('should create a new shopping centre', (done) => {
      let shoppingCentreModel = {name: 'Westfield', Address: { state: 'NSW'}};
      let shoppingCentreDetail = {name: 'Westfield', address: { state: 'NSW'}};
      let shoppingCentreModelStub = { toJSON: () => {return shoppingCentreModel; }};
      request.body = shoppingCentreDetail

      ShoppingCentre.createWithAddress.returns(Promise.resolve(shoppingCentreModelStub));

      controller.create(request, fakeResponse, fakeNext).then ( () =>  {
        fakeNext.should.have.been.called();
        ShoppingCentre.createWithAddress.should.have.been.calledWith(shoppingCentreModel);
        fakeResponse.send.should.have.been.calledWith(201, shoppingCentreDetail);
        done();
      }).catch(done);
    });

    it('should give an error for bad request', (done) => {

      let shoppingCentreModel = {name: 'Westfield', Address: { state: 'NSW'}};
      let shoppingCentreDetail = {name: 'Westfield', address: { state: 'NSW'}};
      let shoppingCentreModelStub = { toJSON: () => {return shoppingCentreModel; }};
      request.body = shoppingCentreDetail
      ShoppingCentre.createWithAddress.returns(Promise.reject({error: 'invalid req'}));

      controller.create(request, fakeResponse, fakeNext).then ( () =>  {
        ShoppingCentre.createWithAddress.should.have.been.calledWith(shoppingCentreModel);
        fakeNext.should.have.been.calledWithMatch({statusCode: 400});
        done();
      });
    });

  });

});
