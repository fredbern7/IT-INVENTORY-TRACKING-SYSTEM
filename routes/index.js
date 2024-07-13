const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/items', require('./items'));
router.use('/deviceUser', require('./deviceUser'));
router.use('/location', require('./locations'));

router.post('/login', userController.loginUser);

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Failed to logout' });
        }
        res.redirect('/');
    });
});

module.exports = router;
