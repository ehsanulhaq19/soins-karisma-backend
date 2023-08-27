const { v4: uuidv4 } = require('uuid');
'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessServiceRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BusinessServiceRoom.belongsTo(models.BusinessService, {
        foreignKey: 'businessServiceId'
      })

      BusinessServiceRoom.belongsTo(models.BusinessServiceRoomStatus, {
        foreignKey: 'statusId'
      })

      BusinessServiceRoom.hasMany(models.BusinessServiceRoomChair, {
        foreignKey: 'roomId',
        onDelete: 'CASCADE'
      })
    }
  }
  BusinessServiceRoom.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalChairs: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    businessServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'BusinessServiceRoom',
    tableName: 'business_service_rooms',
    underscored: true
  });

  BusinessServiceRoom.beforeCreate(businessServiceRoom => {
    businessServiceRoom.uuid = uuidv4()
    return businessServiceRoom
  });

  return BusinessServiceRoom;
};