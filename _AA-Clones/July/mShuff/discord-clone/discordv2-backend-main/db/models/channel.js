'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    title: {
      type: DataTypes.STRING(100),
    },
    topic: {
      type: DataTypes.STRING(1024),
    },
    serverId: DataTypes.INTEGER
  }, {});
  Channel.associate = function(models) {
    // associations can be defined here
    Channel.hasMany(models.Channel_Message, { foreignKey: 'channelId' })
    Channel.belongsTo(models.Server, { foreignKey: 'serverId'})
  };
  return Channel;
};
