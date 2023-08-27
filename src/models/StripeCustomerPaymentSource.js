'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeCustomerPaymentSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StripeCustomerPaymentSource.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    stripeCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stripePaymentSourceId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'StripeCustomerPaymentSource',
    tableName: 'stripe_customer_payment_sources',
    underscored: true
  });

  StripeCustomerPaymentSource.beforeCreate(stripeCustomerPaymentSource => {
    stripeCustomerPaymentSource.uuid = uuidv4()
    return stripeCustomerPaymentSource
  });

  return StripeCustomerPaymentSource;
};