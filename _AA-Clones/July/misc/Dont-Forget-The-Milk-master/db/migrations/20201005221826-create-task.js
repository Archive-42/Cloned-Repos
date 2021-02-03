'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskName: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      description: {
        type: Sequelize.TEXT
      },
      isComplete: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      dueDate: {
        type: Sequelize.DATE
      },
      listId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        references: { model: 'Lists'}
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
    return queryInterface.dropTable('Tasks');
  }
};
