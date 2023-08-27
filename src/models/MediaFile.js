'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MediaFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MediaFile.belongsTo(models.MediaFileStatus, {
        foreignKey: 'statusId'
      })
      MediaFile.belongsTo(models.MediaFileType, {
        foreignKey: 'typeId'
      })
    }
  }
  MediaFile.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING,
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
    modelName: 'MediaFile',
    tableName: 'media_files',
    underscored: true
  });

  MediaFile.beforeCreate(mediaFile => {
    mediaFile.uuid = uuidv4()
    return mediaFile
  });

  return MediaFile;
};