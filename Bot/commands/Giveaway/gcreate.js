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
        // client.giveawaysManager.start(message.channel, {
        //     time: ms(args[0]),
        //     prize: args.slice(2).join(' '),
        //     winnerCount: parseInt(args[1])
        // })
        const giveaway = {
            hostedBy: message.author.id,
            time: args[1],
            winnerCount: parseInt(args[0]),
            winners: [],
            price: args.slice(2).join(" "),
            channel: message.mentions.channels.first() == undefined ? message.channel : message.mentions.channels.first(),
            startedTime: Date.now(),
            blackListRoles: [],
            whiteListRoles: []
        }
        const correctUsage = `Correct usage : \`${settings.general.prefix}gcreate ${module.exports.help.usage}\``

        if (isNaN(giveaway.winnerCount) || giveaway.winnerCount > 20) return message.channel.send({
            embed: {
                description: `${correctUsage} \n${x_mark} Number of winners have to be lower than 20`,
                title: "Invalid number of winners !"
            }
        })
        if (isNaN(ms(giveaway.time))) return message.channel.send({
            embed: {
                description: correctUsage,
                title: 'Invalid duration !'
            }
        })
        if (ms(giveaway.time) < 10000 || ms(giveaway.time) > 1.21e+9) return message.channel.send({
            embed: {
                description: `${x_mark}Duration must be upper than 10 seconds and lower than 2 weeks!`
            }
        })
        if (giveaway.price.includes(giveaway.channel.toString())) giveaway.price = giveaway.price.replace(giveaway.channel.toString(), '');
        if (giveaway.channel.id !== message.channel.id) {
            message.channel.send({embed: {description: `${checkMark}Successfully created giveaway : \nTime : ${ms(ms(giveaway.time))} \nWinners : ${giveaway.winnerCount} \nprice : ${giveaway.price} \nChannel : ${giveaway.channel}`}});
        }
        // message.delete();
        const embed = new MessageEmbed()
            .setTitle(giveaway.price)
            .setAuthor('🎉🎉Giveaway🎉🎉')
            .setColor('#FFFFFF')
            .setTimestamp(Date.now() + ms(giveaway.time))
            .setDescription(`${giveaway.winnerCount} winner(s) \nTime remaining : ${ms(ms(giveaway.time))} \nHosted by : ${message.author}`);

        giveaway.channel.send(embed).then(async msg => {
            msg.react('770980801411678229');
            giveaway.id = msg.id;
            client.createGiveaway(msg.guild, giveaway)
            embed.setFooter(`ID : ${msg.id}`);
            if (msg) msg.edit(embed);
            setTimeout(async () => {
                if (!msg) return;
                //if (giveaway)
                const reactions = msg.reactions.resolve('770980801411678229').users;
                reactions.remove(client.user.id);
                let winners = await reactions.cache.filter(w => !w.bot).filter(w => client.botGuild.ownerID !== w.id).random(giveaway.winnerCount);
                for (let w of winners) {
                    if (!w || w == undefined || w == '' || w.id == undefined) continue;
                    giveaway.winners.push(w)
                }
                if (giveaway.winners.length < giveaway.winnerCount) {
                    msg.channel.send('Giveaway canceled, no valid participations !')
                    const embedError = new MessageEmbed()
                        .setAuthor('🎉Giveaway Cancel🎉')
                        .setTitle(giveaway.price)
                        .setDescription(`To restart the giveaway, type \`${settings.general.prefix}grestart ${msg.id}\``)
                        .setFooter(`ID : ${msg.id}`)
                        .setTimestamp();
                    msg.edit(embedError);
                    client.endGiveaway(msg.guild, giveaway)
                } else {
                    const endEmbed = new MessageEmbed()
                        .setAuthor('🎉Giveaway ended🎉')
                        .setTitle(giveaway.price)
                        .setTimestamp()
                        .setFooter(giveaway.winnerCount + ' winner(s)')
                        .setDescription(`Hosted by : ${message.author} \nWinners : ${giveaway.winners.join(", ")}`);

                    msg.edit(endEmbed);
                    msg.channel.send(`Congratulations ${giveaway.winners.join(", ")} ! You won \`${giveaway.price}\` !`)
                    client.endGiveaway(msg.guild, giveaway)
                }
            }, ms(giveaway.time));
        })
    } catch (e) {
        console.log(e);
    }
};



module.exports.help = MESSAGES.COMMANDS.GIVEAWAY.GCREATE;