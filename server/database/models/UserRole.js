'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    tableName: 'user_role',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return UserRole;
};