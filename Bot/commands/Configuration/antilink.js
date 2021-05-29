const {
    Message,
    MessageEmbed
} = require('discord.js')
const {
    MESSAGES
} = require('../../../util/constants');
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
    // const action = args[0] ? args[0].toLowerCase() : '1';
    // const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    // const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    // const err = strings.configuration.err;

    // if (!action) action = '1';
    // if (action == 'on') action = action.replace('on', 'enable');
    // if (action == 'off') action = action.replace('off', 'disable');

    // switch (action) {
    //     case '1': {
    const embed = new MessageEmbed()
        .setTitle('Anti-Link')
        .setDescription(`${await strings.configuration.reset.replace("{type}", 'Anti-Link')}`)
        .addFields({
            name: `1️⃣ \`\`\`${strings.configuration.enable}\`\`\``,
            value: `${settings.automod.antiLink.enable ? '🟢' : '🔴'}`
        }, {
            name: `2️⃣ \`\`\`${strings.configuration.logsThis}\`\`\``,
            value: `${settings.automod.antiLink.logsThis ? '🟢' : '🔴'}`
        }, {
            name: `3️⃣ \`\`\`${strings.configuration.onlyDelete}\`\`\``,
            value: `${settings.automod.antiLink.onlyDelete ? '🟢' : '🔴'}`
        }, {
            name: `4️⃣ \`\`\`${strings.configuration.onlyWarn}\`\`\``,
            value: `${settings.automod.antiLink.onlyWarn ? '🟢' : '🔴'}`
        }, {
            name: `5️⃣ \`\`\`${strings.configuration.warnAndDelete}\`\`\``,
            value: `${settings.automod.antiLink.warnAndDelete ? '🟢' : '🔴'}`
        }, )
        .setFooter(message.author.tag);
    message.channel.send(embed).then(async msg => {
        msg.react('🔄');
        msg.react('1️⃣');
        msg.react('2️⃣');
        msg.react('3️⃣');
        msg.react('4️⃣');
        msg.react('5️⃣');
    });
    //         break;
    //     }
    //     case 'enable': {
    //         if (!settings.automod.enable) return message.channel.send({
    //             embed: {
    //                 description: `${x_mark} ${await strings.configuration.notEnable.replace("{type}", 'Auto-Moderation').replace("{prefix}", settings.general.prefix).replace("{cmdName}", 'automod')}`,
    //                 title: err
    //             }
    //         })
    //         else {
    //             if (settings.automod.antiLink.enable) return message.channel.send({
    //                 embed: {
    //                     description: `${x_mark} ${await strings.configuration.alrEnable.replace("{type}", 'Anti-Link')}`,
    //                     title: err
    //                 }
    //             });
    //             /**
    //              * @param {Message} m 
    //              */
    //             const filter = m => m.author.id == message.author.id;
    //             message.channel.send(`${message.author} ${await strings.configuration.firstQ.replace("{type}", 'Anti-Link')}`)
    //             const userE = await message.channel.awaitMessages(filter, {
    //                 max: 1, time: 15000, errors: ['time']
    //             })
    //             let type;
    //             if (userE.first().toString() == '1') type = 1
    //             else if (userE.first().toString() == '2') type = 2
    //             else if (userE.first().toString() == '3') type = 3

    //             await message.channel.send(await strings.configuration.secondQ)

    //             const userE2 = await message.channel.awaitMessages(filter, {
    //                 max: 1, time: 15000, errors: ['time']
    //             })

    //             let logs;
    //             if (userE2.first().toString().toLowerCase().startsWith('y')) logs = true;
    //             else if (userE2.first().toString().toLowerCase().startsWith('n')) logs = false
    //             message.channel.send({
    //                 embed: {
    //                     description: `${check_mark}${await strings.configuration.successEnable.replace("{type}", 'Anti-Link')}`,
    //                     title: 'Auto-Moderation'
    //                 }
    //             })
    //             await client.updateGuild(message.guild, {
    //                 "automod.antiLink.enable": true,
    //                 "automod.antiLink.logsThis": logs,
    //                 "automod.antiLink.onlyWarn": type == 2 ? true : false,
    //                 "automod.antiLink.onlyDelete": type == 1 ? true : false,
    //                 "automod.antiLink.warnAndDelete": type == 3 ? true : false
    //             })
    //         }
    //         break;
    //     }
    //     case 'disable': {
    //         if (!settings.automod.antiLink.enable) return message.channel.send({
    //             embed: {
    //                 description: `${x_mark} ${await strings.configuration.alrDisable.replace("{type}", 'Anti-Link')}`,
    //                 title: err
    //             }
    //         });
    //         await client.updateGuild(message.guild, {
    //             "automod.antiLink.enable": false,
    //             "automod.antiLink.onlyWarn": false,
    //             "automod.antiLink.onlyDelete": true,
    //             "automod.antiLink.warnAndDelete": false,
    //             "automod.antiLink.logsThis": false
    //         })
    //         message.channel.send({
    //             embed: {
    //                 description: `${check_mark}${await strings.configuration.successDisable.replace("{type}", 'Anti-Link')}`,
    //                 title: 'Auto-Moderation'
    //             }
    //         })
    //         break;
    //     }
    // }
}

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.ANTILINK;