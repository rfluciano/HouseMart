const db = require('../models'); // This imports the db object
const User = db.User; // Correctly access the User model from the db object
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to register a new user
// Function to register a new user
exports.register = async (req, res) => {
  const { nom, prenom, adresse, datenaissance, email, mot_de_passe } = req.body;

  // Check if all required fields are present
  if (!nom || !prenom || !adresse || !datenaissance || !email || !mot_de_passe) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  try {
      // Check if the email is already in use
      const existingUser = await User.getUserByEmail(email); // Use the static method here
      if (existingUser) {
          return res.status(409).json({ message: 'Email déjà utilisé' });
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

      // Create the new user object
      const newUser = {
          nom,
          prenom,
          adresse,
          datenaissance,
          email,
          mot_de_passe: hashedPassword
      };

      // Save the user to the database
      const user = await User.createUser(newUser);

      // Generate the JWT token after successful registration
      const token = jwt.sign({ id: user.id }, 'votre_secret_de_jwt', { expiresIn: '1h' });

      // Send success response with the token and user ID
      res.status(201).json({
          message: 'Inscription réussie',
          token: token,
          id: user.id, // Add the user ID to the response
          nom: user.nom, // Optionally include the user's name for a personalized greeting
      });
  } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur:', error);
      res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Function to log in a user
exports.login = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const user = await User.getUserByEmail(email); // Use the static method here
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Generate the JWT token
    const token = jwt.sign({ id: user.id }, 'votre_secret_de_jwt', { expiresIn: '1h' });

    // Include the user ID in the response
    res.status(200).json({
      message: 'Connexion réussie',
      token: token,
      id: user.id, // Add the user ID to the response
      nom: user.nom, // Optionally include the user's name for a personalized greeting
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers(); // Use the static method here
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Function to get a user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.getUserById(userId); // Use the static method here
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération de l’utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Function to update a user by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { nom, prenom, adresse, datenaissance, email, mot_de_passe } = req.body;

  try {
    const existingUser = await User.getUserById(userId); // Use the static method here
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    let hashedPassword = existingUser.mot_de_passe;
    if (mot_de_passe) {
      hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    }

    const updatedUser = {
      nom: nom || existingUser.nom,
      prenom: prenom || existingUser.prenom,
      adresse: adresse || existingUser.adresse,
      datenaissance: datenaissance || existingUser.datenaissance,
      email: email || existingUser.email,
      mot_de_passe: hashedPassword
    };

    await User.updateUser(userId, updatedUser); // Use the static method here
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l’utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Function to delete a user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const existingUser = await User.getUserById(userId); // Use the static method here
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    await User.deleteUser(userId); // Use the static method here
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l’utilisateur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
