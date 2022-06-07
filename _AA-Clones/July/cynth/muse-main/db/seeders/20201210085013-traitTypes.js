'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TraitTypes', [
      { id: 1, type: 'firstName', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, type: 'lastName', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, type: 'physical', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, type: 'strengths', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, type: 'weaknesses', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, type: 'motivations', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, type: 'secrets', createdAt: new Date(), updatedAt: new Date() },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TraitTypes', null, {})
  }
};
