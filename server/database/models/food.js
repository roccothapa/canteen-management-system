'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    title: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.SMALLINT,
    description: DataTypes.STRING,
    canteen_manager_id: DataTypes.INTEGER
  }, {
    tableName: 'foods',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  Food.associate = function(models) {
    Food.belongsTo(models.User, {
      foreignKey: 'canteen_manager_id'
    });
  };
  return Food;
};