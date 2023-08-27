'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeSubscriptionProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StripeSubscriptionProduct.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    stripeProductId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'StripeSubscriptionProduct',
    tableName: 'stripe_subscription_products',
    underscored: true
  });

  StripeSubscriptionProduct.beforeCreate(stripeSubscriptionProduct => {
    stripeSubscriptionProduct.uuid = uuidv4()
    return stripeSubscriptionProduct
  });

  return StripeSubscriptionProduct;
};