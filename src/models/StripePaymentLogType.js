'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripePaymentLogType extends Model {
    static associate(models) {
      // define association here
    }
  }
  StripePaymentLogType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StripePaymentLogType',
    tableName: 'stripe_payment_log_types',
    underscored: true,
    timestamps: false
  });
  return StripePaymentLogType;
};