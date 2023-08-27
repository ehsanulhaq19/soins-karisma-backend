'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCollectionList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductCollectionList.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productCollectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ProductCollectionList',
    tableName: 'mshop_product_collection_lists',
    underscored: true
  });
  return ProductCollectionList;
};