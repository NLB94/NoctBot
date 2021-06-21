const {
    MESSAGES
} = require("../../../util/constants");
const {
    MessageEmbed
} = require('discord.js');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    const arrowRight = message.guild.me.permissions.has('USE_EXTERNAL_EMOJIS') ? client.emojis.resolve(client.localEmojis.arrowRight) : '\u200b';

    let user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()) == undefined ? client.users.cache.find(m => m.username.toLowerCase() == args[0].toLowerCase()) : message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()).user)) : client.users.cache.get(args[0]))) : message.author;

    if (!user || user == '')  user = message.author;

    if (user !== message.author) userInfo = await client.getGuildUser(message.guild, user)
    if (userInfo == undefined || !userInfo) return client.createGuildUser(message.guild, user), message.channel.send({ embed: { description: `${arrowRight}${user} sent **0 messages** in this server.` } });

    message.channel.send({ embed: { description: `${arrowRight}${user} sent **${userInfo.messageSent} messages** in this server.` } })

};


module.exports.underCat = MESSAGES.COMMANDS.INFO.GUILD;

module.exports.help = MESSAGES.COMMANDS.INFO.GUILD.MESSAGES;