const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Review.belongsToMany(models.Salon, {
        through: 'SalonReview',
        foreignKey: 'reviewId'
      });
      Review.belongsToMany(models.Product, {
        through: 'ProductReview',
        foreignKey: 'reviewId'
      });
      Review.belongsToMany(models.Subscription, {
        through: 'SubscriptionReview',
        foreignKey: 'reviewId'
      });
      
    }
  }
  Review.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    underscored: true,
  });

  Review.beforeCreate((review, options) => {
    review.uuid = uuidv4();
    return review;
  });
  return Review;
};

// npx command for product_review table
// npx sequelize-cli model:generate --name ProductReview --attributes productId:integer,reviewId:integer

// npx command for subscription_review table
// npx sequelize-cli model:generate --name SubscriptionReview --attributes subscriptionId:integer,reviewId:integer