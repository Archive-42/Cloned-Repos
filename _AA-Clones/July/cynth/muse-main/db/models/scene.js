'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scene = sequelize.define('Scene', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    environmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tensionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: DataTypes.STRING
  }, {});
  Scene.associate = function(models) {
    
    Scene.belongsTo(models.Environment, { foreignKey: 'environmentId' });
    Scene.belongsTo(models.Tension, { foreignKey: 'tensionId' });
    
    Scene.belongsToMany(models.Story, {
      through: models.StoryScene,
      foreignKey: 'sceneId',
      otherKey: 'storyId',
    });
    
    Scene.belongsToMany(models.Character, {
      through: models.SceneCharacter,
      foreignKey: 'sceneId',
      otherKey: 'characterId',
    })
    
  };
  return Scene;
};