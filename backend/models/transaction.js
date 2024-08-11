'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here
      // Assuming you have User and House models defined in models/index.js

      // A transaction belongs to an owner (User)
      this.belongsTo(models.User, {
        foreignKey: 'ID_membre_proprietaire',
        as: 'owner', // Alias for association
        onDelete: 'CASCADE',
      });

      // A transaction belongs to a buyer (User)
      this.belongsTo(models.User, {
        foreignKey: 'ID_membre_reservant',
        as: 'buyer', // Alias for association
        onDelete: 'CASCADE',
      });

      // A transaction belongs to a house
      this.belongsTo(models.House, {
        foreignKey: 'ID_House',
        as: 'house', // Alias for association
        onDelete: 'CASCADE',
      });
    }
  }

  Transaction.init({
    ID_transaction: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ID_membre_proprietaire: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_membre_reservant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ID_House: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Montant: {
      type: DataTypes.FLOAT, // Assuming amount is a decimal value
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions', // Ensure the table name matches your database table
    timestamps: false, // Set to true if your table includes timestamps
  });

  return Transaction;
};
