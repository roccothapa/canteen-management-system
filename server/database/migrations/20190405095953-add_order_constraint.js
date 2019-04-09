'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('orders', ['food_id'], {
        type: 'foreign key',
        name: 'fk_food_order_id',
        references: {
          table: 'foods',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
      
      queryInterface.addConstraint('orders', ['user_id'], {
        type: 'foreign key',
        name: 'fk_user_order_id',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('orders', 'fk_user_order_id'),
      queryInterface.removeConstraint('orders', 'fk_food_order_id'),
    ]);
  }
};
