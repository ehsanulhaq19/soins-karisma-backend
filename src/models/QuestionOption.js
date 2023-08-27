'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionOption.hasMany(models.UserAnswer, {
        foreignKey: 'questionOptionId'
      })
      QuestionOption.belongsTo(models.Question, {
        foreignKey: 'questionId'
      })
      QuestionOption.belongsTo(models.QuestionOptionStatus, {
        foreignKey: 'statusId'
      })
      QuestionOption.belongsTo(models.QuestionOptionType, {
        foreignKey: 'typeId'
      })
    }
  }
  QuestionOption.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    questionId: {
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
    modelName: 'QuestionOption',
    tableName: 'question_options',
    underscored: true
  });

  QuestionOption.beforeCreate(questionOption => {
    questionOption.uuid = uuidv4()
    return questionOption
  });

  return QuestionOption;
};