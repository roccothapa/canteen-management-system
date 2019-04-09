'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Rabin Bhandari',
        address: 'Kathmandu',
        email: 'admin@gmail.com',
        phone: '99498451',
        password: '$2a$08$GmqRammyzkQm4lLacA5hJeEPCDgGzq0kbyclFrsbCmMwG.8H8sHxu'
      },
      {
        name: 'Manager 1',
        address: 'Kathmandu',
        email: 'manager1@gmail.com',
        phone: '99498451',
        password: '$2a$08$GmqRammyzkQm4lLacA5hJeEPCDgGzq0kbyclFrsbCmMwG.8H8sHxu'
      },
      {
        name: 'User 1',
        address: 'Kathmandu',
        email: 'user1@gmail.com',
        phone: '99498451',
        password: '$2a$08$GmqRammyzkQm4lLacA5hJeEPCDgGzq0kbyclFrsbCmMwG.8H8sHxu'
      },
      {
        name: 'Manager 2',
        address: 'Kathmandu',
        email: 'manager2@gmail.com',
        phone: '99498451',
        password: '$2a$08$GmqRammyzkQm4lLacA5hJeEPCDgGzq0kbyclFrsbCmMwG.8H8sHxu'
      },
      {
        name: 'User 2',
        address: 'Kathmandu',
        email: 'user2@gmail.com',
        phone: '99498451',
        password: '$2a$08$GmqRammyzkQm4lLacA5hJeEPCDgGzq0kbyclFrsbCmMwG.8H8sHxu'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};