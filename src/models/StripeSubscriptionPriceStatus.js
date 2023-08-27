'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeSubscriptionPriceStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StripeSubscriptionPriceStatus.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StripeSubscriptionPriceStatus',
    tableName: 'stripe_subscription_price_statuses',
    underscored: true,
    timestamps: false
  });
  return StripeSubscriptionPriceStatus;
};