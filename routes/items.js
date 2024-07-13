const express = require('express');
const router = express.Router();
const { saveItem } = require('../middleware/validate');
const itemController = require('../controllers/items');
const dublication = require('../middleware/checkDublication');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', itemController.getAll);
router.get('/:id', itemController.getSingle);
router.post('/', saveItem, dublication.checkDuplicateTagNumber, itemController.createItem);
router.put('/:id', saveItem, dublication.checkDuplicateTagNumber, itemController.updateItem);
router.delete('/:id', itemController.deleteItem);
router.post('/:id', itemController.issueOutItem);

module.exports = router;