'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessServiceRoomChair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BusinessServiceRoomChair.belongsTo(models.BusinessServiceRoom, {
        foreignKey: 'roomId'
      })

      BusinessServiceRoomChair.belongsTo(models.BusinessServiceRoomChairStatus, {
        foreignKey: 'statusId'
      })
    }
  }
  BusinessServiceRoomChair.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roomId: {
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
    modelName: 'BusinessServiceRoomChair',
    tableName: 'business_service_room_chairs',
    underscored: true
  });

  BusinessServiceRoomChair.beforeCreate(businessServiceRoomChair => {
    businessServiceRoomChair.uuid = uuidv4()
    return businessServiceRoomChair
  });

  return BusinessServiceRoomChair;
};