'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    listName: {
      allowNull: false,
      type: DataTypes.STRING(50)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  List.associate = function(models) {
    List.hasMany(models.Task, { as: "task", foreignKey: "listId" }, { onDelete: "cascade", hooks:true });
    List.belongsTo(models.User, {foreignKey: "userId" });
  };
  return List;
};
