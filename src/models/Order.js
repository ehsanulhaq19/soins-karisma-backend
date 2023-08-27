'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.OrderStatus, {
        foreignKey: 'statusId'
      });

      Order.hasOne(models.StripeCheckoutOrder, {
        foreignKey: 'orderId'
      });

      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Order.belongsTo(models.Cart, {
        foreignKey: 'cartId'
      });

      Order.belongsTo(models.Address, {
        as: 'ShippingAddress',
        foreignKey: 'shippingAddressId'
      });

      Order.belongsTo(models.Address, {
        as: 'BillingAddress',
        foreignKey: 'billingAddressId'
      });
    }
  }
  Order.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
    },
    subTotalAmount: {
      type: DataTypes.DOUBLE,
    },
    userId: {
      type: DataTypes.INTEGER
    },
    billingAddressId: {
      type: DataTypes.INTEGER
    },
    shippingAddressId: {
      type: DataTypes.INTEGER
    },
    taxQst: {
      type: DataTypes.DOUBLE
    },
    taxHst: {
      type: DataTypes.DOUBLE
    },
    taxPst: {
      type: DataTypes.DOUBLE
    },
    taxGst: {
      type: DataTypes.DOUBLE
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'mshop_orders',
    underscored: true
  });

  Order.beforeCreate(order => {
    order.uuid = uuidv4()
    return order
  });

  return Order;
};