'use strict';
module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define(
    'Character',
    {
      imageUrl: {
        type: DataTypes.STRING,
      },
      bio: DataTypes.STRING(300),
    },
    {}
  );
  
  Character.associate = function (models) {
    Character.belongsToMany(models.Scene, {
      through: models.SceneCharacter,
      foreignKey: 'characterId',
      otherKey: 'sceneId',
    });

    Character.hasMany(models.CharacterTrait, { 
      foreignKey: 'characterId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };

  Character.prototype.shapeTraits = function () {
    const shapedTraits = {};
  
    this.CharacterTraits.forEach(characterTrait => {
      shapedTraits[characterTrait.Trait.TraitType.type] = characterTrait.Trait.id;
    });
    // console.log(`****\n\nShape Traits - ImageUrl: ${this.imageUrl}\n\n****`)
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      imageUrl: this.imageUrl,
      bio: this.bio,
      traits: shapedTraits
    };
  };

  return Character;
};
