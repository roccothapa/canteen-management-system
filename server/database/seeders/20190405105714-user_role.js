'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_role', [
      {
        user_id: 1,
        role_id: 1,
      },
      {
        user_id: 2,
        role_id: 2,
      },
      {
        user_id: 3,
        role_id: 3,
      },
      {
        user_id: 4,
        role_id: 2,
      },
      {
        user_id: 5,
        role_id: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_role', null, {});
  }
};
