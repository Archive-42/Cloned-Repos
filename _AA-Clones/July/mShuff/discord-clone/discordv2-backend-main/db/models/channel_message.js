'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel_Message = sequelize.define('Channel_Message', {
    body: {
      type:DataTypes.STRING(2000),
    },
    userId: DataTypes.INTEGER,
    channelId: DataTypes.INTEGER
  }, {});
  Channel_Message.associate = function(models) {
    // associations can be defined here
    Channel_Message.belongsTo(models.User, { foreignKey: "userId"});
    Channel_Message.belongsTo(models.Channel, { foreignKey: "channelId"})
  };
  return Channel_Message;
};
