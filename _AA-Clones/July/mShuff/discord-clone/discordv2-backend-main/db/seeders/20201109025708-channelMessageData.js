'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Channel_Messages', [
      { body: 'Hey', userId: 1, channelId: 3, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Hey There!', userId: 2, channelId: 4, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Testing!', userId: 2, channelId: 1, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Heyaaa', userId: 3, channelId: 3, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Welcome', userId: 4, channelId: 5, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Test!', userId: 3, channelId: 1, createdAt: new Date(), updatedAt: new Date() },

      { body: 'I love Goku', userId: 4, channelId: 3, createdAt: new Date(), updatedAt: new Date() },

      { body: 'I love DBZ', userId: 1, channelId: 2, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Rocket League', userId: 1, channelId: 1, createdAt: new Date(), updatedAt: new Date() },

      { body: 'idk', userId: 4, channelId: 4, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Hows your day?', userId: 1, channelId: 5, createdAt: new Date(), updatedAt: new Date() },

      { body: 'I guess its alright', userId: 2, channelId: 2, createdAt: new Date(), updatedAt: new Date() },

      { body: 'Hahahaha!!!', userId: 6, channelId: 3, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Channel_Messages', null, {});
  }
};
