'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trait = sequelize.define(
    'Trait',
    {
      typeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Trait.associate = function (models) {
    Trait.hasMany(models.CharacterTrait, { foreignKey: 'traitId' });

    Trait.belongsTo(models.TraitType, { foreignKey: 'typeId' });
  };

  Trait.prototype.shapedForRedux = function (traitType) {
    // console.log('*****\n\nTRAIT: ', this.id, this.name, traitType, '\n\n*******')
    return {
      id: this.id,
      name: this.name,
      type: traitType,
    };
  };

  return Trait;
};
