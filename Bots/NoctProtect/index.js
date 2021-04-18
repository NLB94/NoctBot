const Discord = require('discord.js');
const DBLApi = require('@top-gg/sdk');

const botGuild = require('../../.bot.json');
const emojis = require('../../emojis.json');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: ['GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS', 'DIRECT_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
});
const topAPI = new DBLApi.Api(process.env.Protect_DBL_TOKEN);

client.botGuild = botGuild;
client.localEmojis = emojis;
client.topAPI = topAPI;

setInterval(() => {
    topAPI.postStats({
        serverCount: client.guilds.cache.size,
        shardId: client.shard ? client.shard.ids[0] : '', // if you're sharding
        shardCount: client.options.shardCount
    })
}, 1800000);


const {
    loadCommands,
    loadEvents
} = require("./util/loader");
const {
    readdirSync
} = require('fs');

require("./util/guild")(client);
require('./util/message')(client);
require("./util/functions")(client);
require("./util/backup")(client);

["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());
client.categorys = readdirSync(__dirname + '/commands')

loadCommands(client);
loadEvents(client);

client.login(process.env.Protect_TOKEN);

process.on('uncaughtException', (err) => {
    console.log(`Erreur attrapé : ${client.user.tag}`);
    console.log(err);
})