'use strict';

const request = require('supertest');
var bcrypt = require('bcryptjs');

const server = require(`${global.SRC}/server`);
const db = require(`${global.SRC}/models/db`);
const User = db.User;

describe('INTEGRATION::Authentication Controller', () => {
  let app;

  before(() => {
    app = server.create();
  });

  after((done) => app.close(done));

  beforeEach(function(done) {
    User.destroy({
      where: {},
      truncate: true
    }).then(done);
  });

  describe('Authenticate User', () => {

    let existingUser;

    beforeEach( (done) => {

      let hashedPassword = bcrypt.hashSync('dummy', 8);
      let attributes = {
        name: 'testuser1',
        username: 'testuser1',
        password: hashedPassword
      };

      User.create(attributes).then((data) => {
        existingUser = data;
        done();
      });
    });

    it('should authenticate and return token', (done) => {
      let requestParams = {
        username: existingUser.username,
        password: 'dummy'
      };

      request(app)
      .post('/authenticate')
      .send(requestParams)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.token.should.not.be.undefined();
        res.body.token.should.not.be.null();
        done();
      });
    });

    it('should give error for invalid password', (done) => {
      let requestParams = {
        username: existingUser.username,
        password: 'invalid'
      };

      request(app)
      .post('/authenticate')
      .send(requestParams)
      .expect(401)
      .expect('Content-Type', /json/)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
    });

  });

});
