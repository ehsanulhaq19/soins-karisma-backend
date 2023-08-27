'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserStatus.init({
    name: {
      type: DataTypes.STRING(191),
      unique: true
    },
    displayName: {
      type: DataTypes.STRING(191),
      unique: true
    },
    description: {
      type: DataTypes.STRING(191)
    },
  }, {
    sequelize,
    modelName: 'UserStatus',
    tableName: 'user_statuses',
    underscored: true,
    timestamps: false
  });
  return UserStatus;
};