const router = require('express').Router();
const fetch = require('node-fetch');
const {
    getBotGuilds
} = require('../utils/api');
const {
    getMutualGuilds,
} = require('../utils/utils');

router.get('/', async (req, res) => {
    if (req.user) {
        const botGuilds = await getBotGuilds();
        let userGuilds = [];
        req.user.guilds.forEach(g => {
            if ((g.permissions & 32) == 32) userGuilds.push(g);
        });
        const mutualGuilds = await getMutualGuilds(userGuilds, botGuilds);
        // const guildsIcon = mutualGuilds.map(g => (g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.webp` : ''));
        userGuilds = userGuilds.sort((a, b) => (mutualGuilds.includes(a) && !mutualGuilds.includes(b) ? -1 : 1))
        const notMutualGuilds = [];
        userGuilds.forEach(g => {
            if (!mutualGuilds.includes(g)) notMutualGuilds.push(g);
        });
        // let response = '';
        // for (let i = 0; i < mutualGuilds.length; i++) {
        //     response+=(`<img src="${guildsIcon[i]}" alt="test"/><br/>`)
        // };
        await res.send('Here mutual guilds : <br/>' + mutualGuilds.map(g => `${g.name + ' ' + g.id + ' ' + g.icon}`).join('<br/>') + '<br/>And here not mutual guilds : <br/>' + notMutualGuilds.map(g => `${g.name + ' ' + g.id + ' ' + g.icon}`).join("<br/>"));
    } else {
        res.render('errors/401')
    }
})

module.exports = router;