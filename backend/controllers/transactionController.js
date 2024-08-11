// Import Transaction and associated models
const { Transaction, User, House } = require('../models');

// Controller for handling transaction-related operations
const transactionController = {
  // Create a new transaction
  createTransaction: async (req, res) => {
    const { ID_membre_proprietaire, ID_membre_reservant, ID_House, Montant } = req.body;

    try {
      const transaction = await Transaction.create({
        ID_membre_proprietaire,
        ID_membre_reservant,
        ID_House,
        Montant,
      });

      res.status(201).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create transaction', error: error.message });
    }
  },

    getAllTransactions: async (req, res) => {
      try {
        const transactions = await Transaction.findAll({
          include: [
            { model: User, as: 'owner', attributes: ['id', 'nom', 'prenom', 'email'] },
            { model: User, as: 'buyer', attributes: ['id', 'nom', 'prenom', 'email'] },
            { model: House, as: 'house', attributes: ['id', 'lieux','quartier', 'prix'] },
          ],
        });
        res.status(200).json(transactions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve transactions', error: error.message });
      }
    },

  

  // Get a single transaction by ID
  getTransactionById: async (req, res) => {
    const { id } = req.params;

    try {
      const transaction = await Transaction.findByPk(id, {
        include: [
          { model: User, as: 'owner', attributes: ['id', 'nom', 'prenom', 'email'] },
          { model: User, as: 'buyer', attributes: ['id', 'nom', 'prenom', 'email'] },
          { model: House, as: 'house', attributes: ['id', 'lieux','quartier', 'prix'] },
        ],
      });
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve transaction', error: error.message });
    }
  },

  // Update a transaction
  updateTransaction: async (req, res) => {
    const { id } = req.params;
    const { ID_membre_proprietaire, ID_membre_reservant, ID_House, Montant } = req.body;

    try {
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      await transaction.update({
        ID_membre_proprietaire,
        ID_membre_reservant,
        ID_House,
        Montant,
      });

      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update transaction', error: error.message });
    }
  },

  // Delete a transaction
  deleteTransaction: async (req, res) => {
    const { id } = req.params;

    try {
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }

      await transaction.destroy();
      res.status(204).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete transaction', error: error.message });
    }
  },
};

module.exports = transactionController;
