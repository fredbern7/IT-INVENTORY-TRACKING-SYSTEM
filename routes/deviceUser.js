const express = require('express');
const router = express.Router();
const { saveItem } = require('../middleware/validate');
const deviceController = require('../controllers/items');
const dublication = require('../middleware/checkDublication');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', isAuthenticated, deviceController.getAll);
router.get('/:id', isAuthenticated, deviceController.getSingle);
router.post('/', saveItem, isAuthenticated, deviceController.createItem);
router.put('/:id', saveItem, isAuthenticated, deviceController.updateItem);
router.delete('/:id', isAuthenticated, deviceController.deleteItem);

module.exports = router;