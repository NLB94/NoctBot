const router = require('express').Router();

router.get('/', async (req, res) => {
    if (req.user) {
        const {
            getBotGuilds
        } = require('../util/api');
        const {
            getGuildIcon,
            getAdminGuilds,
            getMutualGuilds,
            getNonMutualGuilds,
            sortGuilds
        } = require('../util/utils');
        const guilds = req.user.guilds;
        const botGuilds = await getBotGuilds();
        let userGuilds = await getAdminGuilds(guilds);
        const mutualGuilds = await getMutualGuilds(userGuilds, botGuilds);
        const notMutualGuilds = await getNonMutualGuilds(userGuilds, mutualGuilds);
        userGuilds = await sortGuilds(userGuilds, mutualGuilds);

        let start = `<div class="guild-menu-container"> <div class="guild-menu-item">
        <div class="guild-details-wrapper">`
        let response = '';
        for (let i = 0; i < mutualGuilds.length; i++) {
            const guild = mutualGuilds[i];
            response += (`
            <div class="guild-text">${guild.name}</div>
            <div class="btn-container">
              <a
                class="base-btn dashboard-btn"
                href="/dashboard/${guild.id}"}}
              />
              <img src="${getGuildIcon(guild.id, guild.icon)}" alt="test"/>
            </div><br/>`)
        };
        let final = ((start += response) + `</div></div></div>`)
        // await res.send(final);
        res.render('dashboard/index', {
            mutualGuilds,
            notMutualGuilds,
            images: final
        })
    } else {
        res.render('errors/401')
    }
})

module.exports = router;