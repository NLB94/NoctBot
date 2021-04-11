const {
    MessageEmbed
} = require('discord.js');
const ms = require("ms");
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    let newNb = args[0] ? parseInt(args[0]) : 5;

    if (isNaN(newNb)) newNb = 5;

    const channel = args[1] ? (args[1].startsWith('<#') && args[1].endsWith('>') ? message.mentions.channels.first() : (isNaN(args[1]) ? message.guild.channels.cache.find(c => args[1].toLowerCase() == c.name.toLowerCase()) : message.guild.channels.resolve(args[1]))) : (message.mentions.channels.size < 1 ? message.channel : message.mentions.channels.first());

    if (!channel || channel == '\u200b' || channel.type == 'dm') return message.channel.send({
        embed: {
            description: `${x_mark}Channel not found!`
        }
    });

    if (!channel.isText()) return message.channel.send({
        embed: {
            description: `${x_mark}Channel not found!`
        }
    });;

    if (newNb > 21600) return message.channel.send({
        embed: {
            description: `${x_mark}New slow-mode value should be less than 21600 !`
        }
    })

    await channel.setRateLimitPerUser(newNb, `Requested by ${message.author.username}`)

    const embed = new MessageEmbed()
        .setTitle('SlowMode')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`${checkMark}Successfully set slow-mode in ${channel} to ${channel.rateLimitPerUser}s !`)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp();

    await message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.SLOWMODE;