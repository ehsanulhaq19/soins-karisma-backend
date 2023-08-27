const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BusinessService.belongsTo(models.Salon, {
        foreignKey: 'salonId'
      })

      BusinessService.belongsToMany(models.Employee, { 
        through: 'business_service_employees',
        foreignKey: 'businessServiceId',
        otherKey: 'employeeId'
      });
      models.Employee.belongsToMany(BusinessService, { 
        through: 'business_service_employees',
        foreignKey: 'employeeId',
        otherKey: 'businessServiceId'
      });
      
      BusinessService.belongsTo(models.BusinessServiceStatus, {
        foreignKey: 'statusId'
      })
    }
  }
  BusinessService.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(191),
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
    },
    timeType: {
      type: DataTypes.STRING(191),
    },
    discount: {
      type: DataTypes.STRING,
    },
    discountType: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    defaultImage: {
      type: DataTypes.STRING(191),
    },
    status: {
      type: DataTypes.INTEGER,
    },
    serviceType: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    frName: {
      type: DataTypes.STRING,
    },
    frDescription: {
      type: DataTypes.STRING,
    },
    frTimeType: {
      type: DataTypes.STRING,
    },
    salonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BusinessService',
    tableName: 'business_services',
    underscored: true
  });

  BusinessService.beforeCreate(businessService => {
    businessService.uuid = uuidv4()
    return businessService
  });

  return BusinessService;
};