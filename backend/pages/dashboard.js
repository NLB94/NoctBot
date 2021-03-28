const router = require('express').Router();

router.get('/', (req, res) => {
    res.sendFile('views/page1.html', { root: './backend/' })
})

module.exports = router;