'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    role: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    tableName: 'roles',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Role.associate = function(models) {
    Role.belongsToMany(models.User, { through: 'user_role', foreignKey: 'role_id', otherKey: 'user_id' })
  };
  return Role;
};