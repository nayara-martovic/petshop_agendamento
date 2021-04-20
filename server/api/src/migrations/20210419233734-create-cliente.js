'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      sobrenome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      telefone_secundario: {
        type: Sequelize.STRING(11),
        allowNull: true,
      },
      logradouro: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      complemento: {
        type: Sequelize.STRING(200)
      },
      bairro: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },   
      cep: {
        allowNull: false,
        type: Sequelize.STRING(8)
      },   
      criado_em: {
        allowNull: false,
        type: Sequelize.DATE
      },
      modificado_em: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clientes');
  }
};