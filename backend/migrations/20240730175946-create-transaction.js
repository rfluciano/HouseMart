// models/transaction.js
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    ID_transaction: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'transactions',
    timestamps: false, // Assuming you don't have createdAt/updatedAt columns
  });

  return Transaction;
};
