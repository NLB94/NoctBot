const {
    MessageEmbed, MessageActionRow, MessageButton
} = require('discord.js');
const {
    MESSAGES
} = require('../../../util/constants');
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomID("reset-antiInvite")
                .setEmoji("🔄")
                .setStyle("PRIMARY")
        )
    const embed = new MessageEmbed()
        .setTitle('Anti-Invite')
        .setDescription(`${await strings.configuration.reset.replace("{type}", 'Anti-Invite')}`)
        .addFields({
            name: `1️⃣ \`\`\`${strings.configuration.enable}\`\`\``,
            value: `${settings.automod.antiInvite.enable ? '🟢' : '🔴'}`
        }, {
            name: `2️⃣ \`\`\`${strings.configuration.logsThis}\`\`\``,
            value: `${settings.automod.antiInvite.logsThis ? '🟢' : '🔴'}`
        }, {
            name: strings.configuration.secuLvl,
            value: '\u200b'
        }, {
            name: `3️⃣ \`\`\`${strings.configuration.onlyDelete}\`\`\``,
            value: `${settings.automod.antiInvite.onlyDelete ? '🟢' : '🔴'}`
        }, {
            name: `4️⃣ \`\`\`${strings.configuration.onlyWarn}\`\`\``,
            value: `${settings.automod.antiInvite.onlyWarn ? '🟢' : '🔴'}`
        }, {
            name: `5️⃣ \`\`\`${strings.configuration.warnAndDelete}\`\`\``,
            value: `${settings.automod.antiInvite.warnAndDelete ? '🟢' : '🔴'}`
        }, )
        .setFooter(message.author.tag, message.author.displayAvatarURL({
            dynamic: true
        }))
        .setTimestamp();
    message.channel.send({
        embeds: [embed],
        components: [row]
    }).then(async msg => {
        msg.react('1️⃣');
        msg.react('2️⃣');
        msg.react('3️⃣');
        msg.react('4️⃣');
        msg.react('5️⃣');
    });
    // const action = args[0] ? args[0].toLowerCase() : '1';
    // const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    // const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    // const err = strings.configuration.err;

    // if (action == 'on') action.replace('on', 'enable');
    // if (action == 'off') action.replace('off', 'disable');

    // switch (action) {
    //     case 'enable': {
    //         if (!settings.automod.enable) return message.channel.send({
    //             embeds: [{
    //                 description: `${x_mark} ${await strings.configuration.notEnable.replace("{type}", 'Auto-Moderation').replace("{prefix}", settings.general.prefix).replace("{cmdName}", 'automod')}`,
    //                 title: err
    //             }
    //         })
    //         else {
    //             if (settings.automod.antiInvite.enable) return message.channel.send({
    //                 embeds: [{
    //                     description: `${x_mark} ${await strings.configuration.alrEnable.replace("{type}", 'Anti-Invite')}`,
    //                     title: err
    //                 }
    //             });
    //             /**
    //              * @param {Message} m 
    //              */
    //             const filter = m => m.author.id == message.author.id;
    //             message.channel.send(`${message.author} ${await strings.configuration.firstQ.replace("{type}", 'Anti-Invite')}`)
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
    //                 embeds: [{
    //                     description: `${check_mark}${await strings.configuration.successEnable.replace("{type}", 'Anti-Invite')}`,
    //                     title: 'Auto-Moderation'
    //                 }
    //             })
    //             await client.updateGuild(message.guild, {
    //                 "automod.antiInvite.enable": true,
    //                 "automod.antiInvite.logsThis": logs,
    //                 "automod.antiInvite.onlyWarn": type == 2 ? true : false,
    //                 "automod.antiInvite.onlyDelete": type == 1 ? true : false,
    //                 "automod.antiInvite.warnAndDelete": type == 3 ? true : false
    //             })
    //         }
    //         break;
    //     }
    //     case 'disable': {
    //         if (!settings.automod.antiInvite.enable) return message.channel.send({
    //             embeds: [{
    //                 description: `${x_mark} ${await strings.configuration.alrDisable.replace("{type}", 'Anti-Invite')}`,
    //                 title: err
    //             }
    //         });
    //         await client.updateGuild(message.guild, {
    //             "automod.antiInvite.enable": false,
    //             "automod.antiInvite.onlyWarn": false,
    //             "automod.antiInvite.onlyDelete": true,
    //             "automod.antiInvite.warnAndDelete": false,
    //             "automod.antiInvite.logsThis": false
    //         })
    //         message.channel.send({
    //             embeds: [{
    //                 description: `${check_mark}${await strings.configuration.successDisable.replace("{type}", 'Anti-Invite')}`,
    //                 title: 'Auto-Moderation'
    //             }
    //         })
    //         break;
    //     }
    // }
}
module.exports.underCat = MESSAGES.COMMANDS.CONFIGURATION.AUTOMODERATION;

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.AUTOMODERATION.ANTIINVITE;