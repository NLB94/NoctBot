const {
    Message
} = require('discord.js');
const {
    MESSAGES
} = require("../../../util/constants");
const functions = require("../../../util/functions");

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    const language = settings.general.language;
    try {
        const loading = client.emojis.resolve('783028992231866419');
        const x_mark = client.emojis.resolve('806440609127596032');
        const warning = client.emojis.resolve('806438435933913178');
        const check_mark = client.emojis.resolve('770980790242377739');

        const countArray = ['channels', 'members', 'boosts'];
        let i = 1;

        const m1 = language == 'fr' ? `**Quelle type de catégorie de compte voulez-vous ?** \nCatégories disponibles : \n**${countArray.map(c => `${i++} - ${c}`).join("\n")}\nCHOISISSEZ UN NOMBRE !!**` : `**What is the category of count you want ?** \nAvailable categorys : \n**${countArray.map(c => `${i++} - ${c}`).join("\n")}\nCHOOSE A NUMBER !!**`

        await message.channel.send(m1);
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
        let cat = 0;
        if (userE.first().toString().startsWith('1')) cat = 'channels';
        else if (userE.first().toString().startsWith('2')) cat = 'members';
        else if (userE.first().toString().startsWith('3')) cat = 'boosts';

        if (typeof cat !== "string") return message.channel.send(language == 'fr' ? 'Commande annulée ! **Donnez un nombre correct la prochaine fois !**' : 'Command canceled ! **Please provide a correct number next time !**')
        else {
            const array = cat == 'channels' ? ['all', 'categorys', 'text', 'voice'] : (cat == 'members' ? ['all', 'humans', 'bots'] : ['boosts', 'level']);
            let j = 1;
            message.channel.send(language == 'fr' ? `Le type de catégorie est \`${cat}\`. Quelle est le **type de compte** que vous voulez ? \nTypes disponibles pour la catégorie \`${cat}\` : \n**${array.map(c => `${j++} - ${c}`).join("\n")}\nCHOISISSEZ UN NOMBRE !!**` : `The category type is \`${cat}\`. Now, what is the **type of count** you want ? \nAvailable types for \`${cat}\` : \n**${array.map(c => `${j++} - ${c}`).join("\n")}\nCHOOSE A NUMBER !!**`)
            const userE2 = await message.channel.awaitMessages(filter, {
                time: '10000',
                errors: ['time'],
                max: 1
            })
            let type = 0;
            const nb = userE2.first().toString().slice(0, 1);
            if (cat == 'channels') {
                if (nb == '1') type = 'all';
                else if (nb == '2') type = 'categorys';
                else if (nb == '3') type = 'text';
                else if (nb == '4') type = 'voice'
            } else if (cat == 'members') {
                if (nb == '1') type = 'all';
                else if (nb == '2') type = 'humans';
                else if (nb == '3') type = 'bots';
            } else if (cat == 'boosts') {
                if (nb == '1') type = 'boosts';
                else if (nb == '2') type = 'level';
            }
            if (typeof type == "number") return message.channel.send(language == 'fr' ? 'Commande annulée ! **Donnez un nombre correct la prochaine fois !**' : 'Command canceled ! **Please provide a correct number next time !**')
            else {
                let type = userE2.first().toString().toLowerCase();
                await message.channel.send(language == 'fr' ? `Le salon apparaitra dans un moment${loading}` : `Done, the channel will be appear in few time${loading}`).then(msg => {
                    setTimeout(() => {
                        msg.edit(language == 'fr' ? `${check_mark}**Le salon a été crée !**` : `${check_mark}**Channel created !**`).catch(err => {})
                    }, 2000)
                })

                // let category = settings.countChannels.category == '' ? null : message.guild.channels.resolve(settings.countChannels.category)
                // if (!category) category = message.guild.channels.create('Count Channels', { type: 'category' }).catch(err => {message.channel.send(err)});

                // await client.updateGuild(message.guild, {
                //     "settings.countChannels.category": category.id
                // })

                // if (category.type !== 'category') return message.c;
                const channelName = cat.toLowerCase() == `channels` ? (type == `all` ? `All Channels : ${message.guild.channels.cache.size}` : (type == `categorys` ? `Categorys : ${message.guild.channels.cache.filter(c => c.type == 'category').size}` : (type == `text` ? `Text : ${message.guild.channels.cache.filter(c => c.isText()).size}` : `Voice : ${message.guild.channels.cache.filter(c => c.type == 'voice').size}`))) : (cat.toLowerCase() == `members` ? (type == `all` ? `All members : ${message.guild.memberCount}` : (type == `humans` ? `Members : ${message.guild.members.cache.filter(m => !m.user.bot).size}` : `Bots : ${message.guild.members.cache.filter(m => m.user.bot).size}`)) : (type == `level` ? `Level : ${message.guild.premiumTier}` : `Boosts : ${message.guild.premiumSubscriptionCount}`))
                if (!message.guild.systemChannelFlags.has('BOOST_MESSAGE_DISABLED') && (channelName.startsWith('Level') || channelName.startsWith('Boosts'))) message.channel.send({
                    embed: {
                        description: language == 'fr' ? `${warning}Vous n'avez pas activé **la fonction du serveur \`BOOST_MESSAGE\`**. \n${x_mark}Si vous ne l'avez pas activer ou ne l'activez pas, le bot ne pourra pas modifier automatiquement le salon.` : `${warning}You have to enable **server feature \`BOOST_MESSAGE\`**. \n${x_mark}If you did't enable it or will not enable it, bot can't auto update the count channel.`,
                        title: language == 'fr' ? 'ATTENTION' : 'WARNING'
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
        message.channel.send(language == 'fr' ? '**Commande annulée !**' : '**Command canceled !**')
    }
}

module.exports.help = MESSAGES.COMMANDS.COUNTS.CREATE;