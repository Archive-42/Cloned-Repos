'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StoryScenes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      storyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stories'
        }
      },
      sceneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Scenes'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StoryScenes');
  }
};