const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Salon.belongsTo(models.User, {
        foreignKey: 'email',
        targetKey: 'email',
      });

      Salon.belongsTo(models.Address, {
        foreignKey: 'addressId',
      });

      Salon.hasMany(models.Note, {
        foreignKey: 'salonId',
      });

      Salon.belongsToMany(models.Review, {
        through: 'SalonReview',
        foreignKey: 'salonId'
      });
      Salon.belongsToMany(models.User, {
        as: "Customers",
        through: 'salon_customers',
        foreignKey: 'salonId',
        otherKey: 'userId'
      });

      Salon.belongsToMany(models.MediaFile, {
        as: "SalonImages",
        through: 'salon_images',
        foreignKey: 'salonId',
        otherKey: 'imageId'
      });

      Salon.hasMany(models.BusinessService, {
        foreignKey: 'salonId',
      })

      Salon.belongsTo(models.SalonStatus, {
        foreignKey: 'statusId'
      })
      Salon.belongsTo(models.SalonType, {
        foreignKey: 'typeId'
      })
    }
  }
  Salon.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    subdomain: {
      type: DataTypes.STRING,
      unique: true,
    },
    mobilePhone: {
      type: DataTypes.STRING,
    },
    otherEmail: {
      type: DataTypes.STRING,
    },
    noOfSalons: {
      type: DataTypes.INTEGER,
    },
    describeSalon: {
      type: DataTypes.TEXT,
    },
    noOfChairs: {
      type: DataTypes.INTEGER,
    },
    noOfEmployees: {
      type: DataTypes.INTEGER,
    },
    servicesProvide: {
      type: DataTypes.TEXT,
    },
    approxMonthlyRevenue: {
      type: DataTypes.TEXT,
    },
    siteId: {
      type: DataTypes.INTEGER
    },
    rating: {
      type: DataTypes.DOUBLE
    },
    ownerReview: {
      type: DataTypes.TEXT,
    },
    addressId: {
      type: DataTypes.INTEGER
    },
    fromTime: {
      type: DataTypes.STRING(20)
    },
    toTime: {
      type: DataTypes.STRING(20)
    },
    fromDay: {
      type: DataTypes.STRING(20)
    },
    toDay: {
      type: DataTypes.STRING(20)
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
    modelName: 'Salon',
    tableName: 'karisma_salons',
    underscored: true
  });

  Salon.beforeCreate(salon => {
    salon.uuid = uuidv4()
    return salon
  });

  return Salon;
};