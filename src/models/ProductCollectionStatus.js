'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCollectionStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductCollectionStatus.init({
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ProductCollectionStatus',
    tableName: 'mshop_product_collection_statuses',
    underscored: true,
    timestamps: false
  });
  return ProductCollectionStatus;
};