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
    try {
        let position = !args[0] ? (parseInt(settings.giveaways.length) - 1) : settings.giveaways.map(g => g.id).indexOf(args[0]);
        const giveaway = settings.giveaways[position];
        if (position == -1 || giveaway.status == 'en-cours') return message.channel.send({
            embed: {
                description: `${x_mark}${await client.translate(`The giveaway not ended or doesn't exists.`, 'en', settings.general.language)}`
            }
        })

        const msg = await message.channel.messages.resolve(giveaway.id);
        const newNbWinners = isNaN(parseInt(args[1])) ? giveaway.winnerCount : parseInt(args[1])
        const newWinners = [];

        const reactions = await msg.reactions.resolve('770980801411678229').users;
        await reactions.remove(client.user.id);

        let winners = await reactions.cache.filter(w => !w.bot)/*.filter(w => client.botGuild.ownerID !== w.id)*/.random(newNbWinners);
        for (let w of winners) {
            if (!w || w == undefined || w == '' || w.id == undefined) continue;
            newWinners.push(w)
        }
        if (!newWinners.length || newWinners.length < 1) {
            msg.channel.send('Giveaway canceled, no valid participations !')
            const embedError = new MessageEmbed()
                .setAuthor('🎉Giveaway Cancel🎉')
                .setTitle(giveaway.price)
                .setDescription(`To restart the giveaway, type \`${settings.general.prefix}grestart ${msg.id}\``)
                .setFooter(`ID : ${msg.id}`)
                .setTimestamp();
            msg.edit(embedError);
            client.endGiveaway(msg.guild, giveaway);
        } else {
            const endEmbed = new MessageEmbed()
                .setAuthor('🎉Giveaway ended🎉')
                .setTitle(giveaway.price)
                .setTimestamp()
                .setFooter(newNbWinners + ' winner(s)')
                .setDescription(`Hosted by : <@${giveaway.author}> \nWinners : ${newWinners.join(", ")}`);

            msg.edit(endEmbed);
            msg.channel.send(`Congratulations ${newWinners.join(", ")} ! You won \`${giveaway.price}\` !`)
        }
    } catch (e) {
        console.log(e);
    }
};



module.exports.help = MESSAGES.COMMANDS.GIVEAWAY.GREROLL;