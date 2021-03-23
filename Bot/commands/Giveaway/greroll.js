const {
    MESSAGES
} = require("../../../util/constants");
const ms = require("ms");
const {
    MessageEmbed
} = require("discord.js");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const x_mark = client.emojis.resolve('806440609127596032');
    const checkMark = client.emojis.resolve('770980790242377739');
    try {
        let position = !args[0] ? settings.giveaways.lastIndexOf() : settings.giveaways.map(g => g.id).indexOf(args[0]);
        const giveaway = settings.giveaways[position];
        if (position == -1 || giveaway.status == 'en-cours') return message.channel.send({ embed: { description: `${x_mark}${await client.translate(`Giveaway doesn't exists or ended.`, 'en', settings.general.language)}`}})

        const msg = await message.channel.messages.resolve(giveaway.id);
    } catch (e) {
        console.log(e);
    }
};



module.exports.help = MESSAGES.COMMANDS.GIVEAWAY.GREROLL;