const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessServiceEmployee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BusinessServiceEmployee.belongsTo(models.Employee, {
        foreignKey: 'employeeId'
      })

      BusinessServiceEmployee.belongsTo(models.BusinessService, {
        foreignKey: 'businessServiceId'
      })
    }
  }
  BusinessServiceEmployee.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    businessServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'BusinessServiceEmployee',
    tableName: 'business_service_employees',
    underscored: true
  });

  BusinessServiceEmployee.beforeCreate(businessServiceEmployee => {
    businessServiceEmployee.uuid = uuidv4()
    return businessServiceEmployee
  });
  
  return BusinessServiceEmployee;
};