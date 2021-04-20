'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Cliente.init({
    nome: {
      type: DataTypes.STRING(80), 
      allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(14), 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200), 
      allowNull: false,
      unique: true
    },
    telefone: {
      type: DataTypes.STRING(11), 
      allowNull: false
    },
    telefone_secundario: DataTypes.STRING(11),
    logradouro: {
        type: DataTypes.STRING(200), 
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING(10), 
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    cidade: {
      type: DataTypes.STRING(50), 
      allowNull: false
    },
    complemento: DataTypes.STRING(200),
    cep: {
      type: DataTypes.STRING(8), 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Cliente',
    freezeTableName: true,
    tableName: 'clientes',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'modificado_em'
  });
  return Cliente;
};