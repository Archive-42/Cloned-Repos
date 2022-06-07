'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    taskName: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.TEXT
    },
    isComplete: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    dueDate: {
      type: DataTypes.DATE
    },
    listId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'Lists' }
    }
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.List, { foreignKey: "listId" });
  };
  return Task;
};
