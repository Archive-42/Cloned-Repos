'use strict';
module.exports = (sequelize, DataTypes) => {
  const DM_Server_User = sequelize.define('DM_Server_User', {
    userId: DataTypes.INTEGER,
    DMServerId: DataTypes.INTEGER
  }, {});
  DM_Server_User.associate = function(models) {
    // associations can be defined here
  };
  return DM_Server_User;
};