const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    const arrowRight = client.emojis.resolve(client.localEmojis.arrowRight);
    const embed = new MessageEmbed()
        .setDescription(`${arrowRight}[Add Me](${client.botGuild.inviteLink}) • [Support server](${client.botGuild.supportInvite}) • [Top.gg](https://top.gg/bot/${client.user.id}/vote) • [DiscoBots](http://discobots-botlist.glitch.me/bots/${client.user.id}/vote)`)
        .setTitle('Bot Links🔗')
    message.channel.send(embed);
};
module.exports.underCat = MESSAGES.COMMANDS;

module.exports.help = MESSAGES.COMMANDS.OTHER.ADDBOT;