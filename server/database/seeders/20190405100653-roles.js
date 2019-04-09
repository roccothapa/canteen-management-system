'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        title: 'Administrator',
        role: 'admin',
        description: 'Administrator is able to manager other users.',
      },
      {
        title: 'Canteen Manager',
        role: 'canteen_manager',
        description: 'Canteen Managers are able to manager their foods and orders',
      },
      {
        title: 'Normal User',
        role: 'user',
        description: 'Normal users are able to order food and visit ordered history',
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
