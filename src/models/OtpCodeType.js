'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtpCodeType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OtpCodeType.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OtpCodeType',
    tableName: 'otp_code_types',
    underscored: true,
    timestamps: false
  });
  return OtpCodeType;
};