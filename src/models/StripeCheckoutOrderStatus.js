'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StripeCheckoutOrderStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StripeCheckoutOrderStatus.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StripeCheckoutOrderStatus',
    tableName: 'stripe_checkout_order_statuses',
    underscored: true,
    timestamps: false
  });
  return StripeCheckoutOrderStatus;
};