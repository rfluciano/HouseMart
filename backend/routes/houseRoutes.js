const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController'); // Adjust the path as necessary

// Route to create a new house
router.post('/houses', houseController.createHouse);

// Route to get all houses
router.get('/houses', houseController.getAllHouses);

// Route to get a single house by ID
router.get('/houses/:id', houseController.getHouseById);

// Route to update a house by ID
router.put('/houses/:id', houseController.updateHouse);

// Route to delete a house by ID
router.delete('/houses/:id', houseController.deleteHouse);

router.get('/except/:IdVendeur', houseController.getHousesExceptByIdVendeur);

router.get('/with/:idVendeur', houseController.getHousesByIdVendeur);



module.exports = router;
