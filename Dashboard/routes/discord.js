const router = require('express').Router();
const {
    getBotGuilds
} = require('../util/api');
const {
    User
} = require('../../models');
const {
    getMutualGuilds, getNonMutualGuilds, getAdminGuilds, getGuildIcon, sortGuilds
} = require('../util/utils');

router.get('/guilds', async (req, res) => {
    if (req.user) {
        const guilds = req.user.guilds;
        const botGuilds = await getBotGuilds();
        let userGuilds = await getAdminGuilds(guilds);
        const mutualGuilds = await getMutualGuilds(userGuilds, botGuilds);
        const notMutualGuilds = await getNonMutualGuilds(userGuilds, mutualGuilds);
        userGuilds = await sortGuilds(userGuilds, mutualGuilds);
        let response = '';
        for (let i = 0; i < mutualGuilds.length; i++) {
            const guild = mutualGuilds[i];
            response+=(`<img src="${getGuildIcon(guild.id, guild.icon)}" alt="test"/><br/>`)
        };
        await res.send(response);
    } else {
        res.render('errors/401')
    }
});

router.get('/guilds/:query', async (req, res) => {
    if (req.user) {
        const guilds = req.user.guilds;
        const botGuilds = await getBotGuilds();
        let userGuilds = await getAdminGuilds(guilds);
        const mutualGuilds = await getMutualGuilds(userGuilds, botGuilds);
        const notMutualGuilds = await getNonMutualGuilds(userGuilds, mutualGuilds);
        userGuilds = await sortGuilds(userGuilds, mutualGuilds);
        let response = '';
        for (let i = 0; i < mutualGuilds.length; i++) {
            const guild = mutualGuilds[i];
            response+=(`<img src="${getGuildIcon(guild.id, guild.icon)}" alt="test"/><br/>`)
        };
        await res.send(response);
    } else {
        res.render('errors/401')
    }
})

module.exports = router;