'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSubscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSubscription.belongsTo(models.Subscription, {
        foreignKey: 'subscriptionId'
      })
      UserSubscription.belongsTo(models.UserSubscriptionStatus, {
        foreignKey: 'statusId'
      })
    }
  }
  UserSubscription.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lastPaymentDate: {
      type: DataTypes.DATE
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
    },
    subTotalAmount: {
      type: DataTypes.DOUBLE,
    },
    taxQst: {
      type: DataTypes.DOUBLE
    },
    taxHst: {
      type: DataTypes.DOUBLE
    },
    taxPst: {
      type: DataTypes.DOUBLE
    },
    taxGst: {
      type: DataTypes.DOUBLE
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserSubscription',
    tableName: 'user_subscriptions',
    underscored: true
  });

  UserSubscription.beforeCreate(userSubscription => {
    userSubscription.uuid = uuidv4()
    return userSubscription
  });

  return UserSubscription;
};