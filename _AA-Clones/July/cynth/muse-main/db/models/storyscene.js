'use strict';
module.exports = (sequelize, DataTypes) => {
  const StoryScene = sequelize.define('StoryScene', {
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sceneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  StoryScene.associate = function(models) {
    // associations can be defined here
  };
  return StoryScene;
};