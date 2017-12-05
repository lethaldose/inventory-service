'use strict';
var bcrypt = require('bcryptjs');
const db = require(`${global.SRC}/models/db`);
const User = db.User;


beforeEach ((done) => {
  let hashedPassword = bcrypt.hashSync(global.IntegrationTestUser.password, 8);
  let attributes = {
    name: global.IntegrationTestUser.username,
    username: global.IntegrationTestUser.username,
    password: hashedPassword
  };

  User.destroy({
      where: {},
      truncate: true
    }).then( () => {
      return User.create(attributes);
    }).then(()=>{
      done();
    });

});
