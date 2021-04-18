const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

    const arrowRight = client.emojis.resolve(client.localEmojis.arrowRight);
    const embed = new MessageEmbed()
        .setDescription(`${arrowRight}[Add Me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join) • [Support server](${client.botGuild.supportInvite}) • [Top.gg](https://top.gg/bot/${client.user.id}/vote) • [DiscoBots](http://discobots-botlist.glitch.me/bots/${client.user.id}/vote)`)
        .setTitle('Bot Links🔗')
    message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.OTHER.ADDBOT;