const router = require('express').Router();
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
    const guilds = await fetch('http://localhost/api/discord/guilds').then(data => data.json());
    console.log(guilds);
    res.send();
})

module.exports = router;