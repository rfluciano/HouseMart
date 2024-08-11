const express = require('express');
const userController = require('../controllers/userController'); // Make sure the path is correct

const router = express.Router();

// Route pour l'inscription d'un utilisateur
router.post('/register', userController.register);

// Route pour la connexion d'un utilisateur
router.post('/login', userController.login);

// Route pour obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour obtenir un utilisateur par ID
router.get('/:id', userController.getUserById);

// Route pour mettre à jour un utilisateur par ID
router.put('/:id', userController.updateUser);

// Route pour supprimer un utilisateur par ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
