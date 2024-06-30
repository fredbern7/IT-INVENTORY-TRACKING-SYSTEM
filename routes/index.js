const express = require('express');
const router = express.Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags-['Hello World']
    res.send('Welcome to Project2..');
});

router.use('/users', require('./users'));
router.use('/items', require('./items'));

module.exports = router;
