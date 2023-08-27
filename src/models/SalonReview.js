'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalonReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalonReview.belongsTo(models.Salon, {
        foreignKey: 'salonId',
      });
      SalonReview.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      });

    }
  }
  SalonReview.init({
    salonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'salons',
        key: 'id'
      }
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'reviews',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'SalonReview',
    tableName: 'salon_reviews',
    underscored: true,
  });
  return SalonReview;
};