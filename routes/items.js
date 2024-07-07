const express = require('express');
const router = express.Router();
const { saveItem } = require('../middleware/validate');
const itemController = require('../controllers/items');
const dublication = require('../middleware/checkDublication');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', isAuthenticated, itemController.getAll);
router.get('/:id', isAuthenticated, itemController.getSingle);
router.post('/', isAuthenticated, saveItem, dublication.checkDuplicateTagNumber, itemController.createItem);
router.put('/:id', isAuthenticated, saveItem, dublication.checkDuplicateTagNumber, itemController.updateItem);
router.delete('/:id', isAuthenticated, itemController.deleteItem);

module.exports = router;