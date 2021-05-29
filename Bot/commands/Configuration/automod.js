const {
    MESSAGES
} = require('../../../util/constants');
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
    const embed = new MessageEmbed()
        .setTitle('Auto-Moderation')
        .setDescription(`${await strings.configuration.reset.replace("{type}", 'Auto-Moderation')}`)
        .addFields({
            name: `1️⃣ \`\`\`${strings.configuration.enable}\`\`\``,
            value: `${settings.automod.enable ? '🟢' : '🔴'}`
        }, {
            name: strings.configuration.whiteL,
            value: '\u200b'
        }, {
            name: `2️⃣ \`\`\`Admins\`\`\``,
            value: `${settings.automod.whiteList.admin ? '🟢' : '🔴'}`
        }, {
            name: `3️⃣ \`\`\`Bots\`\`\``,
            value: `${settings.automod.whiteList.bots ? '🟢' : '🔴'}`
        }, {
            name: `4️⃣ \`\`\`Roles\`\`\``,
            value: `${settings.automod.whiteList.whiteRoles.map(r => `<@&${r.id}>`).join(", ")}`
        }, {
            name: `5️⃣ \`\`\`Channels\`\`\``,
            value: `${settings.automod.whiteList.channels.map(c => `<#${c.id}>`).join(", ")}`
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
    
    // const action = args[0].toLowerCase();
    // const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    // const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    // if (action == 'on') action.replace('on', 'enable');
    // if (action == 'off') action.replace('off', 'disable');

    // switch (action) {
    //     case 'enable': {
    //         if (settings.automod.enable) return message.channel.send({
    //             embed: {
    //                 description: `${x_mark} Auto-Moderation **is already enable** !`,
    //                 title: 'Error !'
    //             }
    //         })
    //         else {
    //             await client.updateGuild(message.guild, {
    //                 "automod.enable": true
    //             })
    //             message.channel.send({
    //                 embed: {
    //                     description: `${check_mark}Successfully **enabled auto-moderation system** !`,
    //                     title: 'Auto-Moderation'
    //                 }
    //             })
    //         }
    //         break;
    //     }
    //     case 'disable': {
    //         if (!settings.automod.enable) return message.channel.send({
    //             embed: {
    //                 description: `${x_mark} Auto-Moderation **is already disable** !`,
    //                 title: 'Error !'
    //             }
    //         })
    //         else {
    //             await client.updateGuild(message.guild, {
    //                 "automod.enable": false
    //             })
    //             message.channel.send({
    //                 embed: {
    //                     description: `${check_mark}Successfully **disabled auto-moderation system** !`,
    //                     title: 'Auto-Moderation'
    //                 }
    //             })
    //         }
    //         break;
    //     }
    // }
}

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.AUTOMOD;