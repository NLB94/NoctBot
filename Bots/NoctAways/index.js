const Discord = require('discord.js');
const DBLApi = require('@top-gg/sdk');

const botGuild = require('../../.bot.json');
const emojis = require('../../emojis.json');

const giveawayBot = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: ['GUILDS', 'GUILD_EMOJIS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
});
const topAPI = new DBLApi.Api(process.env.Giveaway_DBL_TOKEN);

giveawayBot.botGuild = botGuild;
giveawayBot.localEmojis = emojis;
giveawayBot.topAPI = topAPI;

setInterval(() => {
    topAPI.postStats({
        serverCount: giveawayBot.guilds.cache.size,
        shardId: giveawayBot.shard ? giveawayBot.shard.ids[0] : '', // if you're sharding
        shardCount: giveawayBot.options.shardCount
    })
}, 1800000);


const {
    loadCommands,
    loadEvents
} = require("./util/loader");

require("./util/guild")(giveawayBot);
require('./util/message')(giveawayBot);
require("./util/functions")(giveawayBot);
require("./util/giveaway")(giveawayBot);

["commands", "cooldowns"].forEach(x => giveawayBot[x] = new Discord.Collection());

loadCommands(giveawayBot);
loadEvents(giveawayBot);

giveawayBot.login(process.env.Giveaway_TOKEN);

process.on('uncaughtException', (err) => {
    console.log(`Erreur attrapé : ${giveawayBot.user.tag}`);
    console.log(err);
})