'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('House', {
      ID_House: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ID_Membre: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Membres', // Name of the related table
          key: 'ID_Membre'
        },
        onDelete: 'CASCADE' // Delete the announcement if the associated member is deleted
      },
      lieu: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quartier: {
        type: Sequelize.STRING,
        allowNull: false
      },
      prix: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create an index on the ID_Membre column to improve the performance of join queries
    await queryInterface.addIndex('House', ['ID_Membre']);
  },

  async down(queryInterface, Sequelize) {
    // Drop the Annonces table if necessary
    await queryInterface.dropTable('House');
  }
};
