const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const msg = args.join(" ");
    const checkMark = client.emojis.resolve('770980790242377739');
    const channel = client.channels.resolve('797799949047562260');
    message.delete();

    const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
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