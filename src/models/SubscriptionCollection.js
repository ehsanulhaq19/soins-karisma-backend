'use strict';

const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionCollection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubscriptionCollection.belongsTo(models.SubscriptionCollectionStatus, {
        foreignKey: 'statusId'
      })
      SubscriptionCollection.belongsTo(models.SubscriptionCollectionType, {
        foreignKey: 'typeId'
      })

      SubscriptionCollection.belongsToMany(models.Subscription, { 
        through: 'subscription_collection_lists',
        foreignKey: 'subscriptionCollectionId',
        otherKey: 'subscriptionId'
      });
    }
  }
  SubscriptionCollection.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
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
    modelName: 'SubscriptionCollection',
    tableName: 'subscription_collections',
    underscored: true
  });

  SubscriptionCollection.beforeCreate(subscriptionCollection => {
    subscriptionCollection.uuid = uuidv4()
    return subscriptionCollection
  });

  return SubscriptionCollection;
};