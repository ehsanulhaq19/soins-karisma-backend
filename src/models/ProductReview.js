const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductReview.belongsTo(models.Product, {
        foreignKey: 'productId',
      });
      ProductReview.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      });
    }
  }
  ProductReview.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewId: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'ProductReview',
    tableName: 'product_reviews',
    underscored: true,
  });

  ProductReview.beforeCreate((product_review, options) => {
    product_review.uuid = uuidv4();
    return product_review;
  });

  return ProductReview;
};