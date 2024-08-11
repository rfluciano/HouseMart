const db = require('../models'); // Import the database
const House = db.House; // Get the House model
const User = db.User; // Get the User model
const { Op } = require('sequelize');


// Create a new house
exports.createHouse = async (req, res) => {
  try {
    const { lieux, quartier, prix, description, categorie, IdVendeur } = req.body;

    // Check if the user exists
    const user = await User.findByPk(IdVendeur);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the house
    const house = await House.create({
      lieux,
      quartier,
      prix,
      description,
      categorie,
      IdVendeur,
    });

    res.status(201).json(house);
  } catch (error) {
    console.error('Error creating house:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all houses
exports.getAllHouses = async (req, res) => {
  try {
    const houses = await House.findAll({
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'nom', 'prenom', 'email'],
        },
      ],
    });
    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single house by ID
exports.getHouseById = async (req, res) => {
  try {
    const { id } = req.params;
    const house = await House.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'nom', 'prenom', 'email'],
        },
      ],
    });

    if (!house) {
      return res.status(404).json({ error: 'House not found' });
    }

    res.status(200).json(house);
  } catch (error) {
    console.error('Error fetching house:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a house by ID
exports.updateHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { lieux, quartier, prix, description, categorie, IdVendeur } = req.body;

    // Check if the user exists
    const user = await User.findByPk(IdVendeur);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [updated] = await House.update(
      { lieux, quartier, prix, description, categorie, IdVendeur },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'House not found' });
    }

    const updatedHouse = await House.findByPk(id);
    res.status(200).json(updatedHouse);
  } catch (error) {
    console.error('Error updating house:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a house by ID
exports.deleteHouse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await House.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ error: 'House not found' });
    }

    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting house:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getHousesExceptByIdVendeur = async (req, res) => {
  try {
    const { IdVendeur } = req.params; // Get the IdVendeur from URL parameters

    if (!IdVendeur) {
      return res.status(400).json({ error: 'IdVendeur parameter is required' });
    }

    const houses = await House.findAll({
      where: {
        IdVendeur: {
          [Op.ne]: IdVendeur // Op.ne means "not equal"
        }
      }
    });

    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all houses where IdVendeur matches the provided value
exports.getHousesByIdVendeur = async (req, res) => {
  try {
    const { idVendeur } = req.params;

    // Ensure idVendeur is not empty or null
    if (!idVendeur) {
      return res.status(400).json({ error: 'IdVendeur is required' });
    }

    // Fetch houses where IdVendeur matches the provided value
    const houses = await House.findAll({
      where: {
        IdVendeur: idVendeur
      }
    });

    if (houses.length === 0) {
      return res.status(404).json({ error: 'No houses found for the provided IdVendeur' });
    }

    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching houses by IdVendeur:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
