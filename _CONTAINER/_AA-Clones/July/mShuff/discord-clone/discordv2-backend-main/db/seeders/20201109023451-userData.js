'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // users need a username, email, hashedPassword, createdAt, updatedAt
    const hashedPassword = await bcrypt.hash('password', 10);
    await queryInterface.bulkInsert('Users', [

      { username: 'Yokito', email: 'shuff@shuff.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'Tamagri', email: 'warren@tamagri.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'Cephandrius', email: 'mark@mcclatchy.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'RyanY', email: 'ryan@black.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'RyanB', email: 'ryan@young.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'Ranson', email: 'ranson@knorr.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'Demo', email: 'demo@example.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'Tester', email: 'test@example.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'Demon King', email: 'demonking@example.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },

      { username: 'Master Roshi', email: 'masterroshi@example.com', hashedPassword: hashedPassword, createdAt: new Date(), updatedAt: new Date() },


    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
