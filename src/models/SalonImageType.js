'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalonImageType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalonImageType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SalonImageType',
    tableName: 'salon_image_types',
    underscored: true,
    timestamps: false
  });
  return SalonImageType;
};