'use strict';
module.exports = (sequelize, DataTypes) => {
  const Environment = sequelize.define('Environment', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {});
  Environment.associate = function(models) {
    
    Environment.hasMany(models.Scene, { foreignKey: 'environmentId' });
    
  };
  return Environment;
};