'use strict';
const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionCollectionList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubscriptionCollectionList.belongsTo(models.SubscriptionCollectionListStatus, {
        foreignKey: 'statusId'
      })
      SubscriptionCollectionList.belongsTo(models.SubscriptionCollectionListType, {
        foreignKey: 'typeId'
      })
    }
  }
  SubscriptionCollectionList.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    subscriptionCollectionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subscriptionId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'SubscriptionCollectionList',
    tableName: 'subscription_collection_lists',
    underscored: true
  });

  SubscriptionCollectionList.beforeCreate(subscriptionCollectionList => {
    subscriptionCollectionList.uuid = uuidv4()
    return subscriptionCollectionList
  });

  return SubscriptionCollectionList;
};