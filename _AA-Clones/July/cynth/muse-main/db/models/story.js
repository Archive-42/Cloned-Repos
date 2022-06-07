'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
      }
    },
    sceneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {});
  Story.associate = function(models) {
    
    Story.belongsTo(models.User, { foreignKey: 'userId' });
    
    Story.belongsToMany(models.Scene, {
      through: models.StoryScene,
      foreignKey: 'storyId',
      otherKey: 'sceneId',
    })
    
  };
  return Story;
};