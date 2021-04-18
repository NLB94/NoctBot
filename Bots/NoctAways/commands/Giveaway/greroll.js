const {
    MESSAGES
} = require("../../util/constants");
const {
    MessageEmbed
} = require('discord.js');

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {


    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    try {
        let position = !args[0] ? (parseInt(settings.giveaways.length) - 1) : settings.giveaways.map(g => g.id).indexOf(args[0]);
        const giveaway = settings.giveaways[position];
        if (position == -1 || giveaway.status == 'en-cours') return message.channel.send({
            embed: {
                description: `${x_mark}${await client.translate(`The giveaway not ended or doesn't exists.`, 'en', settings.general.language)}`
            }
        })

        const msg = await (await message.channel.messages.fetch()).get(giveaway.id);
        const newNbWinners = isNaN(parseInt(args[1])) ? giveaway.winnerCount : parseInt(args[1])
        const newWinners = [];

        if (msg.partial) {
            await msg.fetch();
        }

        const reactions = await msg.reactions.resolve(client.localEmojis.tada).users;

        await reactions.fetch();
        await reactions.remove(client.user.id);

        let winners = await reactions.cache.filter(w => !w.bot).filter(w => giveaway.hostedBy !== w.id).random(newNbWinners);
        for (let w of winners) {
            if (!w || w == undefined || w == '' || w.id == undefined) continue;
            newWinners.push(w)
        }
        
        if (newWinners.length < 1) {
            msg.channel.send('Giveaway canceled, no valid participations !')
            const embedError = new MessageEmbed()
                .setAuthor('🎉Giveaway Cancel🎉')
                .setTitle(giveaway.price)
                .setDescription(`**Giveaway canceled, no valid participations !**\nHosted by <@${giveaway.hostedBy}> \n\n \nJoin [support server](${client.botGuild.supportInvite}) | [Add me](${client.botGuild.inviteLink})`)
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
                .setDescription(`Hosted by : <@${giveaway.hostedBy}> \nWinners : ${newWinners.join(", ")}`);

            msg.edit(endEmbed);
            msg.channel.send(`Congratulations ${newWinners.join(", ")} ! You won \`${giveaway.price}\` !`)
        }
    } catch (e) {
        console.log(e);
    }
};



module.exports.help = MESSAGES.COMMANDS.GIVEAWAY.GREROLL;