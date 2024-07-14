const express = require('express');
const router = express.Router();
const { saveLocation } = require('../middleware/validate');
const locationControl = require('../controllers/location');
const dublication = require('../middleware/checkDublication');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', isAuthenticated, locationControl.getAll);
router.get('/:id', isAuthenticated, locationControl.getSingle);
router.post('/', saveLocation, isAuthenticated, dublication.checkDuplicateLocation, locationControl.createLocation);
router.put('/:id', saveLocation, isAuthenticated, dublication.checkDuplicateLocation, locationControl.updateLocation);
router.delete('/:id', locationControl.deleteLocation);
router.get('/:id', isAuthenticated, locationControl.getSingle);

module.exports = router;