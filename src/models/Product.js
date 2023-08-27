'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Review, {
        through: 'ProductReview',
        foreignKey: 'productId'
      })
      Product.belongsTo(models.ProductStatus, {
        foreignKey: 'statusId'
      })
      Product.hasOne(models.CartItem, {
        foreignKey: 'productId'
      })
    }
  }
  Product.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    rating: {
      type: DataTypes.DOUBLE
    },
    stock: {
      type: DataTypes.INTEGER
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.STRING
    },
    backgroundColor: {
      type: DataTypes.STRING(50)
    },
    statusId: {
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
    modelName: 'Product',
    tableName: 'mshop_products',
    underscored: true
  });

  Product.beforeCreate(product => {
    product.uuid = uuidv4()
    return product
  });
  
  return Product;
};