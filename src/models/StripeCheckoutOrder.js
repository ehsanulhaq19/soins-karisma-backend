'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeCheckoutOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StripeCheckoutOrder.belongsTo(models.StripePaymentLog, {
        foreignKey: 'stripePaymentLogId'
      });
    }
  }
  StripeCheckoutOrder.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stripePaymentLogId: {
      type: DataTypes.INTEGER
    },
    stripeChargeId: {
      type: DataTypes.STRING
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'StripeCheckoutOrder',
    tableName: 'stripe_checkout_orders',
    underscored: true
  });

  StripeCheckoutOrder.beforeCreate(stripeCheckoutOrder => {
    stripeCheckoutOrder.uuid = uuidv4()
    return stripeCheckoutOrder
  });

  return StripeCheckoutOrder;
};