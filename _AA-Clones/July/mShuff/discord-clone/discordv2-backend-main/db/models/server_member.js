'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server_Member = sequelize.define('Server_Member', {
    userId: DataTypes.INTEGER,
    serverId: DataTypes.INTEGER
  }, {});
  Server_Member.associate = function(models) {
    // associations can be defined here
    Server_Member.belongsTo(models.User, { foreignKey: 'userId'})
    Server_Member.belongsTo(models.Server, { foreignKey: 'serverId'})

  };
  return Server_Member;
};