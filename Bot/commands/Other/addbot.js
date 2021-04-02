const {
    MessageEmbed
} = require("discord.js");
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = (client, message, args, settings) => {
    const arrowRight = client.emojis.resolve('770976808899444776');
    const embed = new MessageEmbed()
        .setDescription(`${arrowRight}[Add Me](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join) | [Support server](https://discord.gg/92ffufA) | [Top.gg](https://top.gg/bot/735824367698837555/vote) | [DiscoBots](http://discobots-botlist.glitch.me/bots/735824367698837555/vote)`)
        .setTitle('Bot Links🔗')
    message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.OTHER.ADDBOT;