const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EmployeeSchedule.belongsTo(models.Employee, {
        foreignKey: 'employeeId'
      })
      EmployeeSchedule.belongsTo(models.BusinessServiceRoom, {
        foreignKey: 'businessServiceRoomId'
      })
    }
  }
  EmployeeSchedule.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    locationId: {
      type: DataTypes.INTEGER,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    businessServiceRoomId: {
      type: DataTypes.INTEGER
    },
    isWorking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    days: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'EmployeeSchedule',
    tableName: 'employee_schedules',
    underscored: true
  });

  EmployeeSchedule.beforeCreate(employeeSchedule => {
    employeeSchedule.uuid = uuidv4()
    return employeeSchedule
  });

  return EmployeeSchedule;
};