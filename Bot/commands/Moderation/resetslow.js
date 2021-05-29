const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    const channel = args[0] ? (args[0].startsWith('<#') && args[0].endsWith('>') ? message.mentions.channels.first() : (isNaN(args[0]) ? message.guild.channels.cache.find(c => args[0].toLowerCase() == c.name.toLowerCase()) : message.guild.channels.resolve(args[0]))) : message.channel;

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

    await channel.setRateLimitPerUser(0, `Requested by ${message.author.username}`)
    
    const embed = new MessageEmbed()
        .setTitle('SlowMode')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`${checkMark}Successfully reset slow-mode in ${channel} !`)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp();

    await message.channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.SLOWMODE;