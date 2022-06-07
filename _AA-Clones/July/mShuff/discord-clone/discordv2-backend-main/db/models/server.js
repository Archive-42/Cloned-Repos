'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    title: DataTypes.STRING,
    ownerId: DataTypes.INTEGER
  }, {});
  Server.associate = function(models) {
    Server.belongsTo(models.User, { foreignKey: 'ownerId'});
    Server.hasMany(models.Channel, { foreignKey: 'serverId'});
    Server.hasMany(models.Server_Member, { foreignKey: 'serverId'});
  };
  return Server;
};
