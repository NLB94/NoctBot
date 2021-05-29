const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    const msg = args.join(" ");
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    const channel = client.channels.resolve('797799949047562260');
    message.delete().catch(err => {})

    const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL(), `${client.botGuild.inviteLink}`)
    .setTitle('New Report !')
    .setURL('https://discord.gg/unRX2SUcvw')
    .setDescription(msg)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL())
    .setColor('#000000');

    channel.send(embed);
    message.channel.send({embed: {description: `${checkMark}Successfully reported : \`${msg}\` by ${message.author}`, title: message.author.tag, footer: message.guild.name}});
};



module.exports.help = MESSAGES.COMMANDS.OTHER.REPORT;