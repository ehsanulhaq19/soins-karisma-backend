const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeRoleRelation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeRoleRelation.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'EmployeeRoleRelation',
    tableName: 'employee_role_relations',
    underscored: true
  });

  EmployeeRoleRelation.beforeCreate(employeeRoleRelation => {
    employeeRoleRelation.uuid = uuidv4()
    return employeeRoleRelation
  });

  return EmployeeRoleRelation;
};