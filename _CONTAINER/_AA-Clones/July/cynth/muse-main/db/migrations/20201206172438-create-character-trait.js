'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CharacterTraits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      characterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Characters',
          'key': 'id'
        }
      },
      traitId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Traits'
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
    // return queryInterface.removeColumn('CharacterTraits', 'characterId');
    return queryInterface.dropTable('CharacterTraits');
  }
};