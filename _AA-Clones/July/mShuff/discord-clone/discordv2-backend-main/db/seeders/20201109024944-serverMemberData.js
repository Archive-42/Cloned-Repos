'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Server_Members', [
      { userId: 1, serverId: 2, createdAt: new Date(), updatedAt: new Date() },
      { userId: 1, serverId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, serverId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 2, serverId: 3, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, serverId: 1, createdAt: new Date(), updatedAt: new Date() },
      { userId: 3, serverId: 4, createdAt: new Date(), updatedAt: new Date() },
      { userId: 4, serverId: 1, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Server_Members', null, {});
  }
};
