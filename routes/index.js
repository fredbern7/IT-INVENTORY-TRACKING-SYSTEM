const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/location', require('./location'));

router.post('/login', userController.loginUser);

router.post('/logout', (req, res) => { // Changed to POST
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;