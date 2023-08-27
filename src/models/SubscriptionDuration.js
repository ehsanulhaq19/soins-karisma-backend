'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionDuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubscriptionDuration.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    interval: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SubscriptionDuration',
    tableName: 'subscription_durations',
    underscored: true,
    timestamps: false
  });
  return SubscriptionDuration;
};