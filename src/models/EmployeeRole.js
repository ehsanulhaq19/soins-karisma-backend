'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeRole.init({
    name: {
      type: DataTypes.STRING(191)
    },
    displayName: {
      type: DataTypes.STRING(191)
    },
    description: {
      type: DataTypes.STRING(191)
    }
  }, {
    sequelize,
    modelName: 'EmployeeRole',
    tableName: 'employee_roles',
    underscored: true,
    timestamps: false
  });
  return EmployeeRole;
};