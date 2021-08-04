const Discord = require('discord.js');
const Brawl = require('@statscell/brawl');

const DBLApi = require('@top-gg/sdk');

const botGuild = require('../../.bot.json');
const emojis = require('../../emojis.json');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: ['GUILDS', 'GUILD_EMOJIS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_PRESENCES', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
});

const topAPI = new DBLApi.Api(process.env.Util_DBL_TOKEN);

const brawlManager = new Brawl.Client({
    token: process.env.BRAWL_TOKEN
});

client.botGuild = botGuild;
client.localEmojis = emojis;
client.brawlManager = brawlManager;
client.topAPI = topAPI;

setInterval(() => {
    topAPI.postStats({
        serverCount: client.guilds.cache.size,
        shardId: client.shard ? client.shard.ids[0] : '', // if you're sharding
        shardCount: client.options.shardCount
    })
}, 1800000);


const {
    loadEvents,
    loadCommands
} = require("./util/loader");
const {
    readdirSync
} = require('fs');

require('./util/brawlstars')(client);
require("./util/guild")(client);
require('./util/message')(client);
require("./util/functions")(client);

["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());
client.categorys = readdirSync(__dirname + '/commands');

loadCommands(client);
loadEvents(client);

client.login(process.env.Util_TOKEN);

module.exports = {
    client
}
process.on('uncaughtException', (err) => {
    console.log(`Erreur attrapé :`);
    console.log(err);
})