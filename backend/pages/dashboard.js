const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const guilds = await fetch('http://localhost/api/discord/guilds').then(async data => data.text());
    res.send(`${guilds}`);
})

module.exports = router;