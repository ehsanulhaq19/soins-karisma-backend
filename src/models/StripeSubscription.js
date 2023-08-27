'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeSubscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StripeSubscription.belongsTo(models.Subscription, {
        foreignKey: 'subscriptionId'
      })

      StripeSubscription.belongsTo(models.StripePaymentLog, {
        foreignKey: 'stripePaymentLogId'
      })
    }
  }
  StripeSubscription.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    stripeCustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stripeSubscriptionId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stripePaymentLogId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'StripeSubscription',
    tableName: 'stripe_subscriptions',
    underscored: true
  });

  StripeSubscription.beforeCreate(stripeSubscription => {
    stripeSubscription.uuid = uuidv4()
    return stripeSubscription
  });

  return StripeSubscription;
};