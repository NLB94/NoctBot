const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    ;

    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    const user = args[1] ? (args[1].startsWith('<@') && args[1].endsWith('>') ? message.mentions.users.first() : (isNaN(args[1]) ? (args[1].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[1].toLowerCase()) : (message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[1].toLowerCase()) == undefined ? client.users.cache.find(m => m.username.toLowerCase() == args[1].toLowerCase()) : message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[1].toLowerCase()).user)) : client.users.cache.get(args[1]))) : null;
    if (isNaN(args[0]) && args[0] !== 'all') return message.channel.send({
        embed: {
            description: `${x_mark}Correct usage : \`${settings.general.protectPrefix}clear ${module.exports.help.usage}\``
        }
    });
    if (!isNaN(args[0]) && args[0] > 1) {
        const nb = args[0] - 100;
        if (args[0] > 100) args[0] = 100;
        let messages = await message.channel.messages.fetch({
            limit: Math.min(args[0]),
            before: message.id,
            after: message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) !== undefined ? message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) : null
        });

        if (user !== undefined && user !== null) messages = messages.filter(a => a.author.id === user.id).array()
        else messages = messages.filter(m => m.channel.id == message.channel.id)


        message.delete().catch(err => {})
        if (messages.size < 1) return;
        await message.channel.bulkDelete(messages).then(async () => {
            let nbs = args[0];
            if (nb >= 1) {
                const dizaine = nb % 100
                const centaine = nb - dizaine
                if (nb >= 100) {
                    for (let i = 0; i < centaine; i++) {
                        setInterval(async () => {
                            let messages = await message.channel.messages.fetch({
                                limit: Math.min(100),
                                after: message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) !== undefined ? message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) : null
                            })
                            if (messages.length < 1) return;
                            if (user !== undefined && user !== null) messages = messages.filter(a => a.author.id === user.id).array()
                            else messages = messages.filter(m => m.channel.id == message.channel.id)
                            for (let j = 0; j < messages.length; j++) {
                                nbs++
                            }
                            message.channel.bulkDelete(messages).catch(err => {
                                console.log(err)
                                messages.forEach(msg => {
                                    if (msg.createdAt < (Date.now() / 1209600000) && msg) return;
                                    else {
                                        msg.delete().catch(err => {})
                                    }
                                });
                            })
                        }, 500);
                    }
                }
                if (dizaine > 0) {
                    let messages = await message.channel.messages.fetch({
                        limit: Math.min(dizaine),
                        after: message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) !== undefined ? message.channel.messages.cache.find(m => m.createdAt <= (Date.now() - 1209600000)) : null
                    })
                    if (user !== undefined && user !== null) messages = messages.filter(a => a.author.id === user.id).array()
                    else messages = messages.filter(m => m.channel.id == message.channel.id)
                    if (messages.length < 1) return;
                    for (let j = 0; j < messages.length; j++) {
                        nbs++
                    }
                    message.channel.bulkDelete(messages).catch(err => {
                        console.log(err)
                        messages.forEach(msg => {
                            if (msg.createdAt < (Date.now() / 1209600000) && msg) return;
                            else {
                                msg.delete().catch(err => {})
                            }
                        })
                    });
                }
            }


            for (let timeout = 0; timeout < (nb / 500); timeout++)

                setTimeout(() => {
                    let mesg = user == undefined ? `${checkMark}Successfully cleared ${nbs} message(s) in ${message.channel}!` : `${checkMark}Successfully cleared ${nbs} message(s) of ${user} in ${message.channel}!`;
                    const embed = new MessageEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL())
                        .setColor("#ef0f0f")
                        .setDescription(mesg);
                    message.channel.send(embed).then(msg => {
                        setTimeout(() => {
                            msg.delete().catch(err => {})
                        }, 3000);
                    });
                }, timeout);

        }).catch(() => {
            messages.forEach(msg => {
                if (msg.createdAt < (Date.now() / 1209600000) && msg) return;
                else {
                    msg.delete().catch(err => {})
                }
            });
            let mesg = user == undefined ? `${checkMark}Successfully cleared ${nbs} message(s) in ${message.channel}!` : `${checkMark}Successfully cleared ${nbs} message(s) of ${user} in ${message.channel}!`;
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL())
                .setColor("#ef0f0f")
                .setDescription(mesg);
            message.channel.send(embed).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(err => {})
                }, 5000);
            });
        });

    } else if (args[0] == 'all') {
        const command = client.commands.get('nuke');
        command.run(client, message, args, settings, userInfo)
    }
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.CLEAR;