const {
    Message, MessageEmbed
} = require('discord.js');
const {
    MESSAGES, counterArray, channelTypes
} = require("../../../util/constants");
const functions = require("../../../util/functions");

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
    const language = settings.general.language;
    try {
        const loading = client.emojis.resolve(client.localEmojis.loadingEmoji);
        const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
        const warning = client.emojis.resolve(client.localEmojis.warning);
        const check_mark = client.emojis.resolve(client.localEmojis.checkMark);

        switch (args[0]) {
            case 'create': {

                let i = 1;

                const embed = new MessageEmbed()
                    .setDescription(`**${strings.counters.chooseNb}**`)
                    .setFooter(message.author.tag, message.author.avatarURL())
                    .setTimestamp();
                for (let j in counterArray) {
                    const cnt = counterArray[j];
                    embed.addField(cnt.name[language], `\`\`\`js\n${cnt.types.map(c => `${c.id}・${c.name[language]}`).join("\n")}\`\`\``)
                }
                await message.channel.send({
                    embeds: [embed]
                });
                /**
                 * Filter parameters for messages awaiter
                 * @param {Message} m 
                 */
                const filter = m => m.author.id == message.author.id;
                let userE = await message.channel.awaitMessages(filter, {
                    time: '10000',
                    errors: ['time'],
                    max: 1
                })
                let cat = 0;
                let nb = parseInt(userE.first().toString())
                cat = counterArray.find(c => c.types.map(ch => ch.id).includes(nb))
                console.log(cat);
                let type = 0;
                if (typeof cat == 'number') return message.channel.send(`${strings.cmdCancel} ${strings.counters.NaN}`)
                else {
                    type = cat.types[nb / cat.types[0].id]
                    if (typeof type == "number") return message.channel.send(`${strings.cmdCancel} ${strings.counters.NaN}`)
                    else {
                        let channelType = 'voice';
                        let j = 1;
                        let str = strings.counters.chooseTypeChannel;
                        message.channel.send(str);
                        //Which type of channel do you want to use for the counter (pick one)? voice, text, category, announcement, stage or type cancel to cancel the command.
                        userE = await message.channel.awaitMessages(filter, {
                            time: 20000, max: 1, errors: ['time']
                        });
                        channelType = channelTypes[parseInt(userE.first().toString()) - 1];
                        if (!channelType) channelType = 'voice';
                        await message.channel.send(`${strings.counters.chnlInMmt}${loading}`).then(msg => {
                            setTimeout(() => {
                                msg.edit(`${check_mark}${strings.counters.success}`).catch(err => {})
                            }, 2000)
                        })

                        // let category = settings.countChannels.category == '' ? null : message.guild.channels.resolve(settings.countChannels.category)
                        // if (!category) category = message.guild.channels.create('Counter Channels', { type: 'category' }).catch(err => {message.channel.send(err)});

                        // await client.updateGuild(message.guild, {
                        //     "settings.countChannels.category": category.id
                        // })

                        // if (category.type !== 'category') return message.c;
                        const channelName = `${type.name[language]} : ${cat.id == `channels` ? (type == `all` ? `${message.guild.channels.cache.size}` : message.guild.channels.cache.filter(ch => ch.type == type.type).size) : (cat.id.toLowerCase() == `members` ? (type == `all` ? `${message.guild.memberCount}` : (type == `humans` ? `Members : ${message.guild.members.cache.filter(m => !m.user.bot).size}` : `Bots : ${message.guild.members.cache.filter(m => m.user.bot).size}`)) : (type == `level` ? `Level : ${message.guild.premiumTier}` : `Boosts : ${message.guild.premiumSubscriptionCount}`))}`
                        if (message.guild.systemChannelFlags.has('SUPPRESS_PREMIUM_SUBSCRIPTIONS') && (channelName.startsWith('Level') || channelName.startsWith('Boosts'))) message.channel.send({
                            embeds: [{
                                description: `${warning}${strings.counters.warningBoost}\n${check_mark}${strings.counters.successEnabled}`,
                                title: strings.counters.warning
                            }]
                        }), message.guild.setSystemChannel(message.guild.systemChannel ? message.guild.systemChannel : message.guild.channels.cache.first().id) //, message.guild.systemChannelFlags.remove(["SUPPRESS_PREMIUM_SUBSCRIPTIONS"]); */

                        await message.guild.channels.create(channelName, {
                            type: channelType
                        }).then(async c => {
                            message.guild.roles.cache.forEach(r => {
                                if (!r.permissions.has('ADMINISTRATOR')) {
                                    c.updateOverwrite(r, {
                                        "VIEW_CHANNEL": true,
                                        "CONNECT": false
                                    })
                                }
                            })

                            await client.updateGuild(message.guild, {
                                "countChannels.enable": true
                            })
                            await client.createCounter(message.guild, c, {
                                type,
                                category: cat
                            })
                        })
                    }
                }
                break;
            }
            case 'edit': {
                break;
            }
            case 'delete': {
                break;
            }
        }
    } catch (e) {
        console.log(e);
        message.channel.send(strings.cmdCancel);
    }
}
module.exports.underCat = MESSAGES.COMMANDS.COUNTERS.MANAGE;

module.exports.help = MESSAGES.COMMANDS.COUNTERS.MANAGE.CREATE;