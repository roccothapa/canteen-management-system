'use strict';
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function hashPassword(user, options) {
  const SALT_FACTOR = 8;

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password.trim(), salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    });
}

module.exports = (sequelize, DataTypes) => {

  const attributes = {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
  }

  const User = sequelize.define('User', attributes, {
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    });

  User.associate = function (models) {
    User.belongsToMany(models.Role, { as:'role' ,through: 'user_role', foreignKey: 'user_id', otherKey: 'role_id' });

    User.hasMany(models.Order, {
      foreignKey: 'user_id'
    });

    User.hasMany(models.Food, {
      foreignKey: 'canteen_manager_id'
    });
  };

  User.prototype.comparePassword = function (password) { 
    return bcrypt.compareSync(password, this.password)
  }

  return User;
};