const express = require('express');
const passport = require('passport');
const router = express.Router();
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags-['Hello World']
    res.send('Welcome to Project2..');
});

router.use('/users', require('./users'));
router.use('/items', require('./items'));

router.use('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
