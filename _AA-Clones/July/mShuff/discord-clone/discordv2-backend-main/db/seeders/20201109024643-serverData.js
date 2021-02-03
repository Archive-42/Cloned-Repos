'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Servers', [
      { title: 'Yokitos House', ownerId: '1', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Warrens Place', ownerId: '2', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Marks House', ownerId: '3', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Ryans Crib', ownerId: '4', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Ron Burgundys Abode', ownerId: '5', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Ryan Blacks Server', ownerId: '6', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Ransons Cheese House', ownerId: '6', createdAt: new Date(), updatedAt: new Date() },

      { title: 'DemoLand', ownerId: '7', createdAt: new Date(), updatedAt: new Date() },

      { title: 'The Infinite Universe', ownerId: '7', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Challenge Accepted', ownerId: '7', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Esports Land', ownerId: '7', createdAt: new Date(), updatedAt: new Date() },

      { title: 'Jensens Market', ownerId: '7', createdAt: new Date(), updatedAt: new Date() },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Servers', null, {});
  }
};
