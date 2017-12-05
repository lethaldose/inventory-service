'use strict';

const sinon = require('sinon');
const controller = require(`${global.SRC}/controllers/asset`);
const db = require(`${global.SRC}/models/db`);
let Asset = db.Asset;

describe('Controller: Asset', () => {

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
      sinon.stub(Asset, 'findById');
    });

    afterEach( () => {
      Asset.findById.restore();
    });

    it('should return a asset for an id', (done) => {

      let assetDetails = {name: 'Asset-B1'};
      let assetModelStub = { toJSON: () => {return assetDetails; }};
      request = {params: {id: '999'}}
      Asset.findById.returns(Promise.resolve(assetModelStub));

      controller.get(request, fakeResponse, fakeNext).then( () => {
        fakeResponse.send.should.have.been.calledWithExactly(200, assetDetails);
        fakeNext.should.have.been.called();
        done();
      }).catch(done);
    });

  });

  describe('create', () => {

    beforeEach(() => {
      sinon.stub(Asset, 'create');
    });

    afterEach( () => {
      Asset.create.restore();
    });

    it('should create a new asset', (done) => {
      request.body = {
        name: 'Asset1',
        ShoppingCentreId: 123,
        status: 'active',
        dimensions: {
          height: 55,
          width: 47,
          unit: 'cm'
        },
        location: {
          floor: 2,
          mainCorridor: true,
        }
      };

      let assetDetails = {name: "Asset1"};
      let assetModelStub = { toJSON: () => {return assetDetails; }};
      request.body = assetDetails
      Asset.create.returns(Promise.resolve(assetModelStub));

      controller.create(request, fakeResponse, fakeNext).then ( () =>  {
        fakeNext.should.have.been.called();
        Asset.create.should.have.been.calledWith(request.body);
        fakeResponse.send.should.have.been.calledWith(201, assetDetails);
        done();
      }).catch(done);
    });

  });
});
