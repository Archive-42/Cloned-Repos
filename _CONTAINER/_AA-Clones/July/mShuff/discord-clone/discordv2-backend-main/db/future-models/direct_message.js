'use strict';
module.exports = (sequelize, DataTypes) => {
  const Direct_Message = sequelize.define('Direct_Message', {
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    DMServerId: DataTypes.INTEGER
  }, {});
  Direct_Message.associate = function(models) {
    // associations can be defined here
    Direct_Message.belongsTo(models.User, { foreignKey: 'userId'});
    Direct_Message.belongsTo(models.DM_Server, { foreignKey: 'DMServerId'});
  };
  return Direct_Message;
};