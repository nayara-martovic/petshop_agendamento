'use strict';
const { Model } = require('sequelize');
const Cliente = require('./clientes');

module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pet.init({
    nome: {
      type: DataTypes.STRING(60), 
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: 'id'
      }
    },
    especie: {
      type: DataTypes.STRING(30), 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,30]
      }
    },
    raca: {
      type: DataTypes.STRING(40), 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,40]
      }
    },
    data_nascimento: DataTypes.DATE,
    comportamento: {
      type: DataTypes.STRING(100),
      validate: {
        len: [0,100]
      }
    },
    observacao: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Pet',
    freezeTableName: true,
    tableName: 'pets',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'modificado_em'
  });
  return Pet;
};