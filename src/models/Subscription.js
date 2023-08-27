const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.SubscriptionDuration, {
        foreignKey: 'durationId'
      })
      Subscription.belongsTo(models.SubscriptionStatus, {
        foreignKey: 'statusId'
      })
      Subscription.hasOne(models.StripeSubscriptionProduct, {
        foreignKey: 'subscriptionId'
      })
      Subscription.hasOne(models.StripeSubscriptionPrice, {
        foreignKey: 'subscriptionId'
      })
      Subscription.hasOne(models.StripeSubscription, {
        foreignKey: 'subscriptionId'
      })
      Subscription.hasMany(models.UserSubscription, {
        foreignKey: 'subscriptionId'
      })
      Subscription.belongsToMany(models.Review, {
        through: 'SubscriptionReview',
        foreignKey: 'subscriptionId'
      })
    }
  }
  Subscription.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    },
    durationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxActiveBookingsLimitPerDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxActiveBookingsLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Subscription',
    tableName: 'subscriptions',
    underscored: true
  });

  Subscription.beforeCreate(subscription => {
    subscription.uuid = uuidv4()
    return subscription
  });

  return Subscription;
};