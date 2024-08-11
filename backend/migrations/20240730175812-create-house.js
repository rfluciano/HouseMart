'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Houses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IdVendeur: {
        type: Sequelize.INTEGER
      },
      lieux: {
        type: Sequelize.STRING
      },
      quartier: {
        type: Sequelize.STRING
      },
      prix: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.STRING
      },
      categorie: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Houses');
  }
};