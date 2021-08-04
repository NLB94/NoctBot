const {
    MESSAGES
} = require("../../../util/constants");
const ms = require("ms");
const {
    MessageEmbed
} = require('discord.js');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    try {
        // client.giveawaysManager.start(message.channel, {
        //     time: ms(args[0]),
        //     prize: args.slice(2).join(' '),
        //     winnerCount: parseInt(args[1])
        // })
        const giveaway = {
            hostedBy: message.author.id,
            time: args[1].toLowerCase().includes('s' || 'h' || 'm' || 'd') ? args[1] : args[1] + 's',
            winnerCount: parseInt(args[0]),
            winners: [],
            price: args.slice(2).join(" "),
            channel: message.mentions.channels.first() == undefined ? message.channel : message.mentions.channels.first(),
            startedTime: Date.now(),
            blackListRoles: [],
            whiteListRoles: []
        }
        const correctUsage = `Correct usage : \`${settings.general.prefix}gcreate ${module.exports.help.usage}\``

        if (!giveaway.time || !giveaway.price || !giveaway.winnerCount || giveaway.time == undefined || giveaway.price == undefined || giveaway.winnerCount == undefined) return message.channel.send({
            embeds: [{
                description: correctUsage
            }]
        })
        if (isNaN(giveaway.winnerCount) || giveaway.winnerCount > 20) return message.channel.send({
            embeds: [{
                description: `${correctUsage} \n${x_mark} Number of winners have to be lower than 20`,
                title: "Invalid number of winners !"
            }]
        })
        if (isNaN(ms(giveaway.time))) return message.channel.send({
            embeds: [{
                description: correctUsage,
                title: 'Invalid duration !'
            }]
        })
        if (ms(giveaway.time) < 10000 || ms(giveaway.time) > 1.21e+9) return message.channel.send({
            embeds: [{
                description: `${x_mark}Duration must be upper than 10 seconds and lower than 2 weeks!`
            }]
        })
        if (giveaway.price.includes(giveaway.channel.toString())) giveaway.price = giveaway.price.replace(giveaway.channel.toString(), '');
        if (giveaway.channel.id !== message.channel.id) {
            message.channel.send({
                embeds: [{
                    description: `${checkMark}Successfully created giveaway : \nTime : ${ms(ms(giveaway.time))} \nWinners : ${giveaway.winnerCount} \nprice : ${giveaway.price} \nChannel : ${giveaway.channel}`
                }]
            });
        }
        message.delete().catch(err => {})
        const embed = new MessageEmbed()
            .setTitle(giveaway.price)
            .setAuthor('🎉🎉Giveaway🎉🎉')
            .setColor('#FFFFFF')
            .setTimestamp(Date.now() + ms(giveaway.time))
            .setDescription(`${giveaway.winnerCount} winner(s) \nTime remaining : ${ms(ms(giveaway.time))} \nHosted by : ${message.author}`);

        giveaway.channel.send({embeds: [embed]}).then(async msg => {
            msg.react(client.emojis.resolve(client.localEmojis.tada));
            giveaway.id = msg.id;
            client.createGiveaway(msg.guild, giveaway)
            embed.setFooter(`ID : ${msg.id}`);
            if (msg) msg.edit(embed);
            setInterval(async () => {
                if (msg.embeds[0].author.name !== embed.author.name || ms(giveaway.time) <= 10000) return;
                else {
                    giveaway.time = ms(ms(giveaway.time) - 10000);
                    await embed.setDescription(`${giveaway.winnerCount} winner(s) \nTime remaining : ${ms(ms(giveaway.time))} \nHosted by : ${message.author}`)
                    await msg.edit(embed)
                }
            }, 10000)

            setTimeout(async () => {
                if (!msg) return;
                if (msg.embeds[0].author.name !== embed.author.name) return;
                const reactions = msg.reactions.resolve(client.localEmojis.tada).users;
                reactions.remove(client.user.id);
                let winners = await reactions.cache.filter(w => !w.bot).filter(w => giveaway.hostedBy !== w.id).random(giveaway.winnerCount);
                for (let w of winners) {
                    if (!w || w == undefined || w == '' || w.id == undefined) continue;
                    giveaway.winners.push(w)
                }
                if (giveaway.winners.length < giveaway.winnerCount) {
                    msg.channel.send('Giveaway canceled, no valid participations !')
                    const embedError = new MessageEmbed()
                        .setAuthor('🎉Giveaway Cancel🎉')
                        .setTitle(giveaway.price)
                        .setDescription(`**Giveaway canceled, no valid participations !**\nHosted by <@${giveaway.hostedBy}> \n\n \nJoin [support server](${client.botGuild.supportInvite}) | [Add me](${client.botGuild.inviteLink})`)
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


module.exports.underCat = MESSAGES.COMMANDS.GIVEAWAY.MANAGE;

module.exports.help = MESSAGES.COMMANDS.GIVEAWAY.MANAGE.GCREATE;