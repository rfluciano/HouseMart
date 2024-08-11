// migrations/XXXXXX-create-reservations.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transaction', {
      ID_transaction: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_membre_proprietaire: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Membres',
          key: 'ID_Membre',
        },
      },
      ID_membre_reservant: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Membres',
          key: 'ID_Membre',
        },
      },
      ID_House: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'House',
          key: 'ID_House',
        },
        onDelete: 'CASCADE',
      },
      Montant: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Reservations');
  },
};
