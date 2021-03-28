'use strict';
module.exports = (sequelize, DataTypes) => {
  const TraitType = sequelize.define('TraitType', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  TraitType.associate = function(models) {
    
    TraitType.hasMany(models.Trait, { foreignKey: 'typeId' });
    
  };
  return TraitType;
};