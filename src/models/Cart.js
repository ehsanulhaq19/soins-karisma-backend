'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Cart.belongsTo(models.CartStatus, {
        foreignKey: 'statusId'
      })
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cartId',
        onDelete: 'CASCADE'
      })
      Cart.hasOne(models.Order, {
        foreignKey: 'cartId'
      });
    }
  }
  Cart.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    underscored: true
  });

  Cart.beforeCreate(cart => {
    cart.uuid = uuidv4()
    return cart
  });

  return Cart;
};