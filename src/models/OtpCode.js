'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtpCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //User
      OtpCode.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })

      //OtpCodeType
      OtpCode.belongsTo(models.OtpCodeType, {
        foreignKey: 'type',
        onDelete: 'CASCADE'
      })
    }
  }
  OtpCode.init({
    otpCode: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    expireAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'OtpCode',
    tableName: 'otp_codes',
    underscored: true
  });
  return OtpCode;
};