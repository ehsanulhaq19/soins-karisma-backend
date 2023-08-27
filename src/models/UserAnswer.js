'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAnswer.belongsTo(models.UserAnswerStatus, {
        foreignKey: 'statusId'
      })
      UserAnswer.belongsTo(models.UserAnswerType, {
        foreignKey: 'typeId'
      })
      UserAnswer.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      UserAnswer.belongsTo(models.Question, {
        foreignKey: 'questionId'
      })
      UserAnswer.belongsTo(models.QuestionOption, {
        foreignKey: 'questionOptionId'
      })
    }
  }
  UserAnswer.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    questionOptionId: {
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
    modelName: 'UserAnswer',
    tableName: 'user_answers',
    underscored: true
  });

  UserAnswer.beforeCreate(userAnswer => {
    userAnswer.uuid = uuidv4()
    return userAnswer
  });

  return UserAnswer;
};