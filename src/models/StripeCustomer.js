'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeCustomer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StripeCustomer.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  StripeCustomer.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StripeCustomer',
    tableName: 'stripe_customers',
    underscored: true
  });

  StripeCustomer.beforeCreate(stripeCustomer => {
    stripeCustomer.uuid = uuidv4()
    return stripeCustomer
  });

  return StripeCustomer;
};