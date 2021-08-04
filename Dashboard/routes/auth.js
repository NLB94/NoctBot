const router = require('express').Router();
const passport = require('passport');

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('http://localhost/dashboard')
});

router.get('/user', (req, res) => {
    if (req.user) {
        res.send(req.user)
    } else {
        res.render('errors/401');
    }
})

module.exports = router;