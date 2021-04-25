'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('atendimentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pet_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      servico: {
        type: Sequelize.STRING(40),
        allowNull: false
      },
      data_atendimento: {
        type: Sequelize.DATE,
        allowNull: false
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

    await queryInterface.addConstraint('atendimentos', {
      fields: ['cliente_id'],
      type: 'foreign key',
      name: 'atendimentos_cliente_id_fk',
      references: { //Required field
        table: 'clientes',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    });

    await queryInterface.addConstraint('atendimentos', {
      fields: ['pet_id'],
      type: 'foreign key',
      name: 'atendimentos_pet_id_fk',
      references: { //Required field
        table: 'pets',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'restrict'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('atendimentos');
  }
};