const {
    Message
} = require("discord.js");
const {
    MESSAGES
} = require("../../../util/constants");
const functions = require("../../../util/functions");

module.exports.run = functions.run = async (client, message, args) => {
    try {
        const settings = await client.getGuild(message.guild);
        const loading = client.emojis.resolve('783028992231866419');
        const x_mark = client.emojis.resolve('806440609127596032');
        const check_mark = client.emojis.resolve('770980790242377739');

        const countArray = ['channels', 'members', 'boosts'];
        await message.channel.send(`**What is the category of count you want ?** \nAvailable categorys : _${countArray.join(', ')}_`);
        /**
         * Filter parameters for messages awaiter
         * @param {Message} m 
         */
        const filter = m => m.author.id == message.author.id;
        const userE = await message.channel.awaitMessages(filter, {
            time: '10000',
            errors: ['time'],
            max: 1
        })
        if (!countArray.includes(userE.first().toString().toLowerCase())) return message.channel.send('Command canceled ! **Please provide a correct category next time !**')
        else {
            let cat = userE.first().toString();
            const array = cat.toLowerCase() == 'channels' ? ['all', 'categorys', 'text', 'voice'] : (cat.toLowerCase() == 'members' ? ['all', 'humans', 'bots'] : ['boosts', 'level'])
            message.channel.send(`Alright, category is \`${cat}\`. Now, what is the **type of count** you want ? \nAvailable types for \`${cat}\` : _${array.join(', ')}_`)
            const userE2 = await message.channel.awaitMessages(filter, {
                time: '10000',
                errors: ['time'],
                max: 1
            })
            if (!array.includes(userE2.first().toString().toLowerCase())) return message.channel.send('Command canceled ! **Please provide a correct type next time !**')
            else {
                let type = userE2.first().toString().toLowerCase();
                await message.channel.send(`Done, the channel will be appear in few time${loading}`).then(msg => {
                    setTimeout(() => {
                        msg.edit(`${check_mark}Channel created !`).catch(err => {})
                    }, 2000)
                })

                // let category = settings.countChannels.category == '' ? null : message.guild.channels.resolve(settings.countChannels.category)
                // if (!category) category = message.guild.channels.create('Count Channels', { type: 'category' }).catch(err => {message.channel.send(err)});

                // await client.updateGuild(message.guild, {
                //     "settings.countChannels.category": category.id
                // })

                // if (category.type !== 'category') return message.c;
                const channelName = cat.toLowerCase() == `channels` ? (type == `all` ? `All Channels : ${message.guild.channels.cache.size}` : (type == `categorys` ? `Categorys : ${message.guild.channels.cache.filter(c => c.type == 'category').size}` : (type == `text` ? `Text : ${message.guild.channels.cache.filter(c => c.isText()).size}` : `Voice : ${message.guild.channels.cache.filter(c => c.type == 'voice').size}`))) : (cat.toLowerCase() == `members` ? (type == `all` ? `All members : ${message.guild.memberCount}` : (type == `humans` ? `Members : ${message.guild.members.cache.filter(m => !m.user.bot).size}` : `Bots : ${message.guild.members.cache.filter(m => m.user.bot).size}`)) : (type == `level` ? `Level : ${message.guild.premiumTier}` : `Boosts : ${message.guild.premiumSubscriptionCount}`))
                if (!message.guild.systemChannelFlags.has('BOOST_MESSAGE_DISABLED') && (channelName.startsWith('Level') || channelName.startsWith('Boosts'))) return message.channel.send({
                    embed: {
                        description: `${x_mark}You have to enable **system feature \`BOOST_MESSAGE\`**. \nPlease retry after enable it.`
                    }
                });

                await message.guild.channels.create(channelName, {
                    type: 'voice'
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
                    await client.createCount(message.guild, c, {
                        type,
                        category: cat
                    })
                })
            }
        }
    } catch (e) {
        message.channel.send('**Command canceled !**')
    }
}

module.exports.help = MESSAGES.COMMANDS.COUNTS.CREATE;