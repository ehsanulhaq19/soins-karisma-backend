const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingStatusDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BookingStatusDetail.belongsTo(models.BookingStatusDetailStatus, {
        foreignKey: 'statusId'
      })
      BookingStatusDetail.belongsTo(models.BookingStatusDetailType, {
        foreignKey: 'typeId'
      })
      BookingStatusDetail.belongsTo(models.Booking, {
        foreignKey: 'bookingId'
      })
      BookingStatusDetail.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  BookingStatusDetail.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BookingStatusDetail',
    tableName: 'booking_status_details',
    underscored: true
  });

  BookingStatusDetail.beforeCreate(bookingStatusDetail => {
    bookingStatusDetail.uuid = uuidv4()
    return bookingStatusDetail
  });

  return BookingStatusDetail;
};