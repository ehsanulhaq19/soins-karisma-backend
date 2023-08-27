'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalonCustomerType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SalonCustomerType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SalonCustomerType',
    tableName: 'salon_customer_types',
    underscored: true,
    timestamps: false
  });
  return SalonCustomerType;
};