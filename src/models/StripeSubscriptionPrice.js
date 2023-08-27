'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeSubscriptionPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StripeSubscriptionPrice.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    stripePriceId: {
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
    modelName: 'StripeSubscriptionPrice',
    tableName: 'stripe_subscription_prices',
    underscored: true
  });

  StripeSubscriptionPrice.beforeCreate(stripeSubscriptionPrice => {
    stripeSubscriptionPrice.uuid = uuidv4()
    return stripeSubscriptionPrice
  });

  return StripeSubscriptionPrice;
};