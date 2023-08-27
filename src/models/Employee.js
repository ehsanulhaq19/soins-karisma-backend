const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Employee.belongsTo(models.Salon, {
        foreignKey: 'salonId'
      })

      Employee.hasOne(models.EmployeeSchedule, {
        foreignKey: 'employeeId'
      })

      Employee.belongsToMany(models.BusinessService, { 
        through: 'business_service_employees',
        foreignKey: 'employeeId',
        otherKey: 'business_service_id'
      });

      Employee.belongsToMany(models.EmployeeRole, { 
        through: 'employee_role_relations',
        foreignKey: 'employeeId',
        otherKey: 'roleId'
      });
      
      models.EmployeeRole.belongsToMany(Employee, { 
        through: 'employee_role_relations',
        foreignKey: 'roleId',
        otherKey: 'employeeId'
      });
    }
  }
  Employee.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    calendarColor: {
      type: DataTypes.STRING(50)
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    salonId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    underscored: true
  });

  Employee.beforeCreate(employee => {
    employee.uuid = uuidv4()
    return employee
  });

  return Employee;
};