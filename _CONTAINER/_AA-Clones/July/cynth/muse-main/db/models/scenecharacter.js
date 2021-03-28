'use strict';
module.exports = (sequelize, DataTypes) => {
  const SceneCharacter = sequelize.define('SceneCharacter', {
    sceneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  SceneCharacter.associate = function(models) {
        
  };
  return SceneCharacter;
};