const router = require('express').Router();
const api = require('../routes');
const dashboard = require('../pages')

router.use('/api', api);
router.use('/dashboard', dashboard);
router.get('/', (req, res) => {
    res.render('index');
})
router.get('/login', (req, res) => {
    res.redirect('/api/auth/discord/redirect');
});
router.get('/commands', (req, res) => {
    res.render('commands')
})
router.get('/leaderboard', (req, res) => {
    res.render('dashboard/leaderboard')
})
router.get('/dashboard', (req, res) => {
    res.render('dashboard/index')
})
router.get('/show', (req, res) => {
    res.render('dashboard/show')
})
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/info', checkAuth, (req, res) => {
    res.json(req.user);
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.render('errors/401');
}

module.exports = router;