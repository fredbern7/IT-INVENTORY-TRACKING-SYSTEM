const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { saveUser } = require('../middleware/validate');
const dublication = require('../middleware/checkDublication');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', isAuthenticated, userController.getAll);
router.get('/:id', isAuthenticated, userController.getSingle);
router.post('/', isAuthenticated, saveUser, dublication.checkDuplicateEmail, userController.createUser);
router.put('/:id', isAuthenticated, saveUser, dublication.checkDuplicateEmail, userController.updateUser);
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;