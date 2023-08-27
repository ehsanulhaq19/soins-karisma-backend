'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeCustomerPaymentSourceType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StripeCustomerPaymentSourceType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StripeCustomerPaymentSourceType',
    tableName: 'stripe_customer_payment_source_types',
    underscored: true,
    timestamps: false
  });
  return StripeCustomerPaymentSourceType;
};