const { Message } = require('discord.js');
const {
    MESSAGES
} = require('../../util/constants');
const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    const action = args[0].toLowerCase();
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    if (action == 'on') action.replace('on', 'enable');
    if (action == 'off') action.replace('off', 'disable');

    switch (action) {
        case 'enable': {
            if (!settings.automod.enable) return message.channel.send({
                embed: {
                    description: `${x_mark} Auto-Moderation **is not enable** ! Type \`${settings.general.prefix}automod enable\` and **retry !**`,
                    title: 'Error !'
                }
            })
            else {
                if (settings.automod.antiInvite.enable) return message.channel.send({
                    embed: {
                        description: `${x_mark} Anti-Invite **is already enable** !`,
                        title: 'Error !'
                    }
                });
                /**
                 * @param {Message} m 
                 */
                const filter = m => m.author.id == message.author.id;
                message.channel.send(`${message.author} What type of system you want with **anti-invite** ? \n1 - **Just delete the message** \n2 - **Just warn the user** \n3 - **Delete the message & warn the user** \n**CHOOSE A NUMBER**`)
                const userE = await message.channel.awaitMessages(filter, {
                    max: 1, time: 15000, errors: ['time']
                })
                let type;
                if (userE.first().toString() == '1') type = 1
                else if (userE.first().toString() == '2') type = 2
                else if (userE.first().toString() == '3') type = 3

                await message.channel.send('Done ! Do you want to log this ? (yes or no)')

                const userE2 = await message.channel.awaitMessages(filter, {
                    max: 1, time: 15000, errors: ['time']
                })

                let logs;
                if (userE2.first().toString().toLowerCase().startsWith('y')) logs = true;
                else if (userE2.first().toString().toLowerCase().startsWith('n')) logs = false
                message.channel.send({
                    embed: {
                        description: `${check_mark}Successfully **enabled anti-invite system** !`,
                        title: 'Auto-Moderation'
                    }
                })
                await client.updateGuild(message.guild, {
                    "automod.antiInvite.enable": true,
                    "automod.antiInvite.logsThis": logs,
                    "automod.antiInvite.justWarn": type == 2 ? true : false,
                    "automod.antiInvite.justDelete": type == 1 ? true : false,
                    "automod.antiInvite.warnAndDelete": type == 3 ? true : false
                })
            }
            break;
        }
        case 'disable': {
            if (!settings.automod.antiInvite.enable) return message.channel.send({
                embed: {
                    description: `${x_mark} Anti-Invite **is already disable** !`,
                    title: 'Error !'
                }
            });
            await client.updateGuild(message.guild, {
                "automod.antiInvite.enable": false,
                "automod.antiInvite.justWarn": false,
                "automod.antiInvite.justDelete": false,
                "automod.antiInvite.warnAndDelete": false,
                "automod.antiInvite.logsThis": false
            })
            message.channel.send({
                embed: {
                    description: `${check_mark}Successfully **disabled anti-invite system** !`,
                    title: 'Auto-Moderation'
                }
            })
            break;
        }
    }
}

module.exports.help = MESSAGES.COMMANDS.SERVERSETTINGS.ANTIINVITE;