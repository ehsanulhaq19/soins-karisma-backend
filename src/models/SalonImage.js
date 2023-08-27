'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalonImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SalonImage.belongsTo(models.SalonImageStatus, {
        foreignKey: 'statusId'
      })
      SalonImage.belongsTo(models.SalonImageType, {
        foreignKey: 'typeId'
      })
    }
  }
  SalonImage.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    salonId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageId: {
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
    modelName: 'SalonImage',
    tableName: 'salon_images',
    underscored: true
  });

  SalonImage.beforeCreate(salonImage => {
    salonImage.uuid = uuidv4()
    return salonImage
  });

  return SalonImage;
};