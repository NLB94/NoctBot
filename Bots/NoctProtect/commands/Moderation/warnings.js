const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require('../../util/constants');
const fnc = require('../../util/functions');

module.exports.run = fnc.run = async (client, message, args, settings, userInfo) => {
    const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;
    if (user == undefined) return message.channel.send({
        embed: {
            description: `${x_mark}User not found !`
        }
    })
    if (user.bot) return message.channel.send("Bots can't receive experience!");

    const member = message.guild.member(user);
    if (!member) return message.channel.send({
        embed: {
            description: `${x_mark}User not in this server!`
        }
    });

    if (user !== message.author && user !== message.member) userInfo = await client.getGuildUser(message.guild, member)
    if (userInfo == undefined) await client.createGuildUser(message.guild, user);

    const embed = new MessageEmbed()
        .setAuthor(user.tag, user.avatarURL())
        .setDescription(`${user} have **${userInfo.warns}** warnings.`)
        .setFooter(message.author.tag, message.author.avatarURL())
        .setTimestamp();

    message.channel.send(embed)
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.WARNINGS;