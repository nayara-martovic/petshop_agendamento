'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      especie: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      raca: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      data_nascimento: {
        type: Sequelize.DATE
      },
      comportamento: {
        type: Sequelize.STRING(100)
      },
      observacao: {
        type: Sequelize.TEXT
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

    await queryInterface.addConstraint('pets', {
      fields: ['cliente_id'],
      type: 'foreign key',
      name: 'pets_cliente_id_fk',
      references: { //Required field
        table: 'clientes',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'restrict'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pets');
  }
};