'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtpCodeStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OtpCodeStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'OtpCodeStatus',
    tableName: 'otp_code_statuses',
    underscored: true,
    timestamps: false
  });
  return OtpCodeStatus;
};