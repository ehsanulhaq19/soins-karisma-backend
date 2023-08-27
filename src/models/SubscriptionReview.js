const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubscriptionReview.belongsTo(models.Subscription, {
        foreignKey: 'subscriptionId',
      });
      SubscriptionReview.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      });
    }
  }
  SubscriptionReview.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'SubscriptionReview',
    tableName: 'subscription_reviews',
    underscored: true,
  });

  SubscriptionReview.beforeCreate((subscription_review, options) => {
    subscription_review.uuid = uuidv4();
    return subscription_review;
  });

  return SubscriptionReview;
};