'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId'
      })
      CartItem.belongsTo(models.CartItemStatus, {
        foreignKey: 'statusId'
      })
    }
  }
  CartItem.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
    underscored: true
  });

  CartItem.beforeCreate(cartItem => {
    cartItem.uuid = uuidv4()
    return cartItem
  });

  return CartItem;
};