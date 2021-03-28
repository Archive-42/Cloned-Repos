'use strict';
module.exports = (sequelize, DataTypes) => {
  const DM_Server = sequelize.define('DM_Server', {
    title: DataTypes.STRING
  }, {});
  DM_Server.associate = function(models) {
    // associations can be defined here
    DM_Server.hasMany(models.Direct_Message, { foreignkey: 'DMServerId'})

    const columnMappingDMServerUsers = {
      through: 'DM_Server_User',
      foreignKey: "DMServerId",
      otherKey: "userId",
    };
    DM_Server.belongsToMany(models.User, columnMappingDMServerUsers)

  };
  return DM_Server;
};