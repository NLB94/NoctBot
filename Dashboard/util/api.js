const fetch = require('node-fetch');
const axios = require('axios').default;
const { Guild } = require('discord.js')

const getBotGuilds = /**
@return {Guild}
*/async () => {
    const response = await fetch('https://discord.com/api/v6/users/@me/guilds', {
        method: 'GET',
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`
        }
    })
    return response.json()
}

module.exports = {
    getBotGuilds
}