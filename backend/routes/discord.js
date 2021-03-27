const router = require('express').Router();
const {
    getBotGuilds
} = require('../utils/api');
const { User } = require('../../models/main');
const { getMutualGuilds } = require('../utils/utils');

router.get('/guilds', async (req, res) => {
    const guilds = await getBotGuilds()
    const user = await User.findOne({ userID: req.user ? req.user.userID : null })
    if (user) {
        const userGuilds = user.guilds
        const mutualGuilds = await getMutualGuilds(userGuilds, guilds)
        res.send(mutualGuilds)
    }
    else {
        return res.status(401).send({ msg: 'Unauthorized'});
    }
});

router.put('/guilds/:guildID/prefix', async (req, res) => {
    const { prefix } = req.body;
    if (!prefix) res.status(400).send({ msg: 'Prefix Required' })
})



module.exports = router;