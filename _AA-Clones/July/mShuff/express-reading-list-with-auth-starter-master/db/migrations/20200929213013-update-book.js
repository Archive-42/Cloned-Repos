'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Books', 'userId', {
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      type: Sequelize.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
  }
};
