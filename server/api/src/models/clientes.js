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
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,80]
      }
    },
    sobrenome: {
        type: DataTypes.STRING(100), 
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1,100]
        }
    },
    cpf: {
      type: DataTypes.STRING(14), 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,14]
      }
    },
    email: {
      type: DataTypes.STRING(200), 
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
    telefone: {
      type: DataTypes.STRING(11), 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,11]
      }
    },
    telefone_secundario: {
      type: DataTypes.STRING(11),
      validate: {
        len: [0,11]
      }
    },
    logradouro: {
        type: DataTypes.STRING(200), 
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1,200]
        }
    },
    numero: {
        type: DataTypes.STRING(10), 
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1,10]
        }
    },
    bairro: {
        type: DataTypes.STRING(100), 
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1,50]
        }
    },
    cidade: {
      type: DataTypes.STRING(50), 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,50]
      }
    },
    complemento: DataTypes.STRING(200),
    cep: {
      type: DataTypes.STRING(8), 
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,8]
      }
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