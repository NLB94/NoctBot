const router = require('express').Router();
const passport = require('passport');

router.all('/discord', passport.authenticate('discord'), (req, res) => {
    res.redirect('http://localhost/dashboard')
});

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.render('errors/401');
    }
})

module.exports = router;