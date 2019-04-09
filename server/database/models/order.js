'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    food_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    canteen_manager_id: DataTypes.INTEGER,
    quantity: DataTypes.MEDIUMINT,
    unit_price: DataTypes.FLOAT,
    total_amount: DataTypes.FLOAT,
    status: {
      type:   DataTypes.ENUM,
      values: ['pending', 'completed', 'canceled']
    }
  }, {
    tableName: 'orders',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Order.associate = function(models) {
    Order.belongsTo(models.Food, {
      as:'food', foreignKey: 'food_id', onDelete: 'cascade'
    });

    Order.belongsTo(models.User, {
      as:'user', foreignKey: 'user_id', onDelete: 'cascade'
    });
  };
  return Order;
};