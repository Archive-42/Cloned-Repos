'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tension = sequelize.define('Tension', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {});
  Tension.associate = function(models) {
    
    Tension.hasMany(models.Scene, { foreignKey: 'tensionId' });
    
  };
  return Tension;
};