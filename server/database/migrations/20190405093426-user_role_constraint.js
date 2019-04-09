'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addConstraint('user_role', ['user_id'], {
        type: 'foreign key',
        name: 'fk_user_id',
        references: {
          table: 'users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),

      queryInterface.addConstraint('user_role', ['role_id'], {
        type: 'foreign key',
        name: 'fk_role_id',
        references: {
          table: 'roles',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('user_role', 'fk_user_id'),
      queryInterface.removeConstraint('user_role', 'fk_role_id'),
    ]);
  }
};
