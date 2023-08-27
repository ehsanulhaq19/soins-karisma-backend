const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.BusinessServiceEmployee, {
        foreignKey: 'businessServiceEmployeeId'
      })
      Booking.belongsTo(models.User, {
        as: 'Booker',
        foreignKey: 'bookerId'
      })
      Booking.belongsTo(models.BookingStatus, {
        foreignKey: 'statusId'
      })
      Booking.belongsTo(models.BusinessServiceRoom, {
        foreignKey: 'businessServiceRoomId'
      })
      Booking.belongsTo(models.BusinessServiceRoomChair, {
        foreignKey: 'businessServiceRoomChairId'
      })
    
    }
  }
  Booking.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    bookerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookerName: {
      type: DataTypes.STRING(255),
    },
    bookerPhone: {
      type: DataTypes.STRING(255),
    },
    bookerEmail: {
      type: DataTypes.STRING(255),
    },
    isSmsAlert: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isEmailAlert: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    note: {
      type: DataTypes.TEXT,
    },
    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    originalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    amountToPay: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    businessServiceEmployeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    businessServiceRoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    businessServiceRoomChairId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
    underscored: true
  });

  Booking.beforeCreate(booking => {
    booking.uuid = uuidv4()
    return booking
  });

  return Booking;
};