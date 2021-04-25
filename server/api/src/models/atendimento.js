'use strict';
const { Model } = require('sequelize');
const Cliente = require('./clientes');
const Pet = require('./pet');

module.exports = (sequelize, DataTypes) => {
  class Atendimento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Atendimento.init({
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: 'id'
      }
    },
    pet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pet,
        key: 'id'
      }
    },
    servico: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,40]
      }
    },
    data_atendimento: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Atendimento',
    freezeTableName: true,
    tableName: 'atendimentos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'modificado_em'
  });
  return Atendimento;
};