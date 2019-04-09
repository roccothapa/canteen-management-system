'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('foods', ['canteen_manager_id'], {
      type: 'foreign key',
      name: 'fk_canteen_manager_id',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('foods', 'fk_canteen_manager_id');
  }
};
