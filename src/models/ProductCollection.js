'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductCollection.belongsTo(models.ProductCollectionStatus, {
        foreignKey: 'statusId'
      })

      ProductCollection.hasMany(models.ProductCollectionList, {
        foreignKey: 'productCollectionId'
      })

      ProductCollection.belongsToMany(models.Product, { 
        through: 'mshop_product_collection_lists',
        foreignKey: 'productCollectionId',
        otherKey: 'productId'
      });
    }
  }
  ProductCollection.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    backgroundColor: {
      type: DataTypes.STRING(50)
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    benefits: {
      type: DataTypes.JSON,
      get: function() {
        return JSON.parse(this.getDataValue("benefits"));
      },
      set: function(value) {
        return this.setDataValue("benefits", JSON.stringify(value));
      }
    },
    ingredients: {
      type: DataTypes.JSON,
      get: function() {
        return JSON.parse(this.getDataValue("ingredients"));
      },
      set: function(value) {
        return this.setDataValue("ingredients", JSON.stringify(value));
      }
    }
  }, {
    sequelize,
    modelName: 'ProductCollection',
    tableName: 'mshop_product_collections',
    underscored: true
  });

  ProductCollection.beforeCreate(productCollection => {
    productCollection.uuid = uuidv4()
    return productCollection
  });

  return ProductCollection;
};