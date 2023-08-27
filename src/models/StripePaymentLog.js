'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripePaymentLog extends Model {
    static associate(models) {
      // define association here
    }
  }
  StripePaymentLog.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function() {
        return JSON.parse(this.getDataValue("response"));
      },
      set: function(value) {
        return this.setDataValue("response", JSON.stringify(value));
      }
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
    modelName: 'StripePaymentLog',
    tableName: 'stripe_payment_logs',
    underscored: true
  });

  StripePaymentLog.beforeCreate(stripePaymentLog => {
    stripePaymentLog.uuid = uuidv4()
    return stripePaymentLog
  });

  return StripePaymentLog;
};