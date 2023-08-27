const { v4: uuidv4 } = require('uuid');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'User'
      });
      
      Note.belongsTo(models.Salon, {
        foreignKey: 'salonId',
        as: 'Salon'
      });

    }
  }
  Note.init({
    uuid: {
      type: DataTypes.STRING,
      defaultValue: sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    salonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'karisma_salons',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Note',
    tableName: 'notes',
    underscored: true
  });

  Note.beforeCreate((note, options) => {
    note.uuid = uuidv4();
    return note;
  });

  return Note;
};