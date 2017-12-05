'use strict';

let bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let hashedPassword = bcrypt.hashSync('roger@123', 8);

    return queryInterface.bulkInsert('Users', [{
      name: 'testuser1',
      username: 'testuser1',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
