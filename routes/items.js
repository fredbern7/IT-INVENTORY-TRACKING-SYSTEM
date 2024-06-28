const express = require('express');
const router = express.Router();

const itemController = require('../controllers/items');

router.get('/', itemController.getAll);
router.get('/:id', itemController.getSingle);

module.exports = router;