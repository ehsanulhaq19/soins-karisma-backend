const { v4: uuidv4 } = require('uuid');

'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.OtpCode, {
        foreignKey: 'userId'
      })

      User.hasMany(models.Order, {
        foreignKey: 'userId'
      })

      User.hasOne(models.StripeCustomer, {
        foreignKey: 'userId'
      })

      User.belongsTo(models.UserStatus, {
        foreignKey: 'statusId'
      })

      User.belongsTo(models.UserType, {
        foreignKey: 'typeId'
      })

      User.belongsTo(models.Address, {
        foreignKey: 'addressId'
      })

      User.belongsToMany(models.Role, { 
        through: 'user_roles',
        foreignKey: 'userId',
        otherKey: 'roleId'
      });

      User.belongsToMany(models.Subscription, { 
        through: 'user_subscriptions',
        foreignKey: 'userId',
        otherKey: 'subscriptionId'
      });

      User.belongsToMany(models.Salon, { 
        through: 'salon_customers',
        foreignKey: 'userId',
        otherKey: 'salonId'
      });
      
      models.Role.belongsToMany(User, { 
        through: 'user_roles',
        foreignKey: 'roleId',
        otherKey: 'userId'
      });

      User.hasMany(models.Note, {
        foreignKey: 'userId'
      });
    }
  }
  
  User.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4
    },
    userName: {
      type: DataTypes.STRING(191),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
          isEmail: true,
      }
    },
    mobile: {
      type: DataTypes.STRING(191)
    },
    password: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(1)
    },
    profileImage: {
      type: DataTypes.STRING(191)
    },
    phone: {
      type: DataTypes.STRING(191)
    },
    lastSeen: {
      type: DataTypes.DATE
    },
    rememberToken: {
      type: DataTypes.STRING(100)
    },
    salutation: {
      type: DataTypes.STRING(8)
    },
    firstName: {
      type: DataTypes.STRING(64)
    },
    lastName: {
      type: DataTypes.STRING(64)
    },
    enableTwoFactorAuthentication: {
      type: DataTypes.BOOLEAN
    },
    locale: {
      type: DataTypes.STRING(50)
    },
    addressId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'addresses',
        key: 'id'
      }
    },
    statusId: {
      type: DataTypes.INTEGER
    },
    typeId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      references: {
        model: 'user_types',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });

  User.beforeCreate(user => {
    user.uuid = uuidv4()
    return user
  });

  return User;
};