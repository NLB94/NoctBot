const {
    MESSAGES
} = require("../../../util/constants");
const {
    MessageEmbed
} = require("discord.js");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const x_mark = client.emojis.resolve('806440609127596032');
    const checkMark = client.emojis.resolve('770980790242377739');
    const arrowRight = message.guild.me.permissions.has('USE_EXTERNAL_EMOJIS') ? client.emojis.resolve('770976808899444776') : '\u200b';

    let user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()) == undefined ? client.users.cache.find(m => m.username.toLowerCase() == args[0].toLowerCase()) : message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()).user)) : client.users.cache.get(args[0]))) : message.author;

    if (!user || user == '')  user = message.author;

    const userInfo = await client.getGuildUser(message.guild, message.guild.member(user))

    message.channel.send({ embed: { description: `${arrowRight}${user} sent **${userInfo.messageSent} messages** in this server.` } })

};



module.exports.help = MESSAGES.COMMANDS.INFO.MESSAGES;