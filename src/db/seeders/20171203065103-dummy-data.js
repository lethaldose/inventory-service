'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ShoppingCentres', [{
      name: 'Westfield Chatswood',
      description: 'A super mall',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Westfield Pitt Street',
      description: 'City center mall',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ShoppingCentres', null, {});
  }
};
