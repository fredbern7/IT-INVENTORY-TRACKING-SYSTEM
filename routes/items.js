const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const itemController = require('../controllers/items');
const dublication = require('../middleware/checkDublication');

router.get('/', itemController.getAll);
router.get('/:id', itemController.getSingle);
router.post('/', validation.saveItem, dublication.checkDuplicateTagNumber, itemController.createItem);
router.put('/:id', validation.saveItem, dublication.checkDuplicateTagNumber, itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;