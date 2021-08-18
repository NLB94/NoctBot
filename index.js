require('dotenv').config();

const Discord = require('discord.js');
// const {
//     GiveawaysManager
// } = require('./util/giveaway/');
const Brawl = require('@statscell/brawl');
const translate = require('@vitalets/google-translate-api');

const DBLApi = require('@top-gg/sdk');

const botGuild = require('./.bot.json');
const emojis = require('./emojis.json');

const express = require('express');
const app = express();
const port = 4000;
const languages = ['en', 'fr'];
const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: ['GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS', 'DIRECT_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
    
});
const topAPI = new DBLApi.Api(process.env.DBL_TOKEN);
const webhook = new DBLApi.Webhook('Topgg_94Noct_94');

const brawlManager = new Brawl.Client({
    token: process.env.BRAWL_TOKEN
});

client.trad = translate;
client.botGuild = botGuild;
client.localEmojis = emojis;
client.brawlManager = brawlManager;
client.topAPI = topAPI;
for (const lang of languages) {
    client[lang] = require(`./string/${lang}.json`);
    console.log(lang);
}

require('./util/constants');
setInterval(() => {
    if (client.user.id == client.botGuild.clientID) topAPI.postStats({
        serverCount: client.guilds.cache.size,
        shardId: client.shard ? client.shard.ids[0] : '', // if you're sharding
        shardCount: client.options.shardCount
    })
}, 1800000);


const {
    loadEvents,
    loadCommands,
    // loadBots
} = require("./util/loader");
const {
    readdirSync
} = require('fs');

// require('./src/strategies/discord')(client);
require('./util/user')(client);

setTimeout(() => {
    require('./Dashboard/server')(client);
}, 3000)
require('./util/brawlstars')(client);
require("./util/guild")(client);
require('./util/message')(client);
require("./util/functions")(client);
require("./util/backup")(client);
require("./util/giveaway")(client);
require("./util/economy")(client);
require("./util/level")(client);

client.mongoose = require("./util/mongoose");

["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());
client.categories = readdirSync('./Bot/commands').slice(1);

loadCommands(client);
loadEvents(client);
// loadBots();

app.use(express.json())

app.listen(port, () => console.log(`Server is live on port ${port}`));


client.mongoose.init();

client.login(process.env.TOKEN).then(async() => {
    await app.get('/commands', (req, res) => {
        res.send(client.commands.map(cmd => cmd.help))
    })
	await app.get('/client', (req, res) => {
        if(req.headers.authorization !== 'Bearer 817kHUIa7189.ioHuaoç9.PIIHOan') return res.status(403).send({ msg: 'Unauthorized'})
        res.send(client);
    })

	app.post('/dblwebhook', webhook.listener(async vote => {
  		if (!vote.bot) return;
        await client.newVote(vote, Date.now());
	})) 
});
module.exports = {
    client,
    languages
};

process.on('uncaughtException', (err) => {
    console.log(`Erreur attrapé :`);
    console.log(err);
})