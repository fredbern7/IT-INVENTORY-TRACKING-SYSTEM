const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to Project2..');
});

router.use('/users', require('./users'));
router.use('/items', require('./items'));

module.exports = router;
