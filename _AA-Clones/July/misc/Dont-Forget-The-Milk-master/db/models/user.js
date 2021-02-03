
'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
    lastName: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },
    email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(100)
  },
    userName: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING(50)
  },
    hashedPassword: {
    allowNull: false,
    type: DataTypes.STRING.BINARY
  },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.List, { foreignKey: "userId" });
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  return User;
};
