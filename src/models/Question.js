'use strict';
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.hasMany(models.QuestionOption, {
        foreignKey: 'questionId'
      })
      Question.belongsTo(models.QuestionStatus, {
        foreignKey: 'statusId'
      })
      Question.belongsTo(models.QuestionType, {
        foreignKey: 'typeId'
      })
    }
  }
  Question.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.INTEGER
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
    modelName: 'Question',
    tableName: 'questions',
    underscored: true
  });

  Question.beforeCreate(question => {
    question.uuid = uuidv4()
    return question
  });

  return Question;
};