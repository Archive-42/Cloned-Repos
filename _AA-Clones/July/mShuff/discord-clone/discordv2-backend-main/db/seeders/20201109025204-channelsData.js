'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Channels', [
      { title: 'Home', topic: 'Home Channel', serverId: 1, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 2, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 3, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 4, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 5, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 6, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 7, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 8, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 9, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 10, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 11, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Home', topic: 'Home Channel', serverId: 12, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Jamming', topic: 'Come Jam!', serverId: 8, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Recipes', topic: 'Need Recipes? Come Here!', serverId: 9, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Sports', topic: 'Dodgeball!', serverId: 10, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Politics', topic: 'Politics Channel', serverId: 11, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Music', topic: 'Music Channel', serverId: 12, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Entertainment', topic: 'E! Channel', serverId: 8, createdAt: new Date(), updatedAt: new Date() },

      { title: 'News', topic: 'News Channel', serverId: 9, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Anime!', topic: 'Anime Channel', serverId: 10, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Movies', topic: 'Movies Channel', serverId: 11, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Good Habits', topic: 'Motivational  Channel', serverId: 12, createdAt: new Date(), updatedAt: new Date() },

      { title: 'DBZ', topic: 'DragonBallZ', serverId: 7, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Holidays!', topic: 'Happy Holidays', serverId: 7, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Gaming', topic: 'Gamers Unite', serverId: 7, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Dance Off', topic: 'Dance-Off 2021', serverId: 5, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Movies', topic: 'The Great Escape', serverId: 6, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Politics', topic: 'Stay Civil Please', serverId: 5, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Homey', topic: 'Homies Channel', serverId: 1, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Love', topic: 'All Things Love!', serverId: 5, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Dares', topic: 'Double Dog Dares Only', serverId: 1, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Wines', topic: 'Channel for Wines and other Spirits', serverId: 5, createdAt: new Date(), updatedAt: new Date() },

      { title: 'Philosophy', topic: 'What is the internet?', serverId: 3, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Channels', null, {});
  }
};
