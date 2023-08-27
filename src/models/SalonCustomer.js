'use strict';

const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalonCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SalonCustomer.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      SalonCustomer.belongsTo(models.Salon, {
        foreignKey: 'salonId'
      })
      SalonCustomer.belongsTo(models.SalonCustomerStatus, {
        foreignKey: 'statusId'
      })
      SalonCustomer.belongsTo(models.SalonCustomerType, {
        foreignKey: 'typeId'
      })
    }
  }
  SalonCustomer.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    salonId: {
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
    modelName: 'SalonCustomer',
    tableName: 'salon_customers',
    underscored: true
  });

  SalonCustomer.beforeCreate(salonCustomer => {
    salonCustomer.uuid = uuidv4()
    return salonCustomer
  });

  return SalonCustomer;
};