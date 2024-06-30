const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { saveUser } = require('../middleware/validate');
const dublication = require('../middleware/checkDublication');

router.get('/', userController.getAll);
router.get('/:id', userController.getSingle);
router.post('/', saveUser, dublication.checkDuplicateEmail, userController.createUser);
router.put('/:id', saveUser, dublication.checkDuplicateEmail, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;