'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripePaymentLogStatus extends Model {
    static associate(models) {
      // define association here
    }
  }
  StripePaymentLogStatus.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StripePaymentLogStatus',
    tableName: 'stripe_payment_log_statuses',
    underscored: true,
    timestamps: false
  });
  return StripePaymentLogStatus;
};