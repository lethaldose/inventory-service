const sinon = require('sinon');
const request = require('supertest');

const server = require(`${global.SRC}/server`);


describe('INTEGRATION::ShoppingCentre Controller', () => {
  let app;

  before(() => {
    app = server.create();
  });

  after((done) => app.close(done));

  afterEach(() => {
  });

  describe('Get shopping centre', () => {

    it('should get error for empty id', (done) => {
      request(app)
      .get(`/shopping-centre/`)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        let invalidField = [ { path: 'id', message: 'should be a string' } ];
        res.body.fields.should.eql(invalidField);
        if (err) return done(err);
        done();
      });
    });

  });

});
