'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('foods', [
      {
        title: 'Food 1',
        price: 124.56,
        quantity: 35,
        description: 'Very tasty food.',
        canteen_manager_id: 2
      },
      {
        title: 'Food 2',
        price: 124.56,
        quantity: 150,
        description: 'Very tasty food.',
        canteen_manager_id: 4
      },
      {
        title: 'Food 3',
        price: 124.56,
        quantity: 2,
        description: 'Very tasty food.',
        canteen_manager_id: 2
      },
      {
        title: 'Food 4',
        price: 75,
        quantity: 3,
        description: 'Very tasty food.',
        canteen_manager_id: 4
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('foods', null, {});
  }
};
