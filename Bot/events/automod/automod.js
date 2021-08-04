const Discord = require('discord.js')
const {
    GuildData,
    Client
} = require('../../../util/functions')
const functions = require('./automod')
const {
    Guild
} = require('../../../models');

/**
 * 
 * @param {Client} client 
 * @param {functions.AutomodOpt} options 
 */
module.exports = async (client, options) => {
    const settings = options.settings;
    if (!settings.automod.enable) return;
    const message = options.message;
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    const userInfo = options.userInfo;
    if ((settings.automod.whiteList.admin && message.member.permissions.has('ADMINISTRATOR')) || (settings.automod.whiteList.bots && message.author.bot)) return
    let checkRoles = false;
    if (options.message.member.permissions.has('ADMINISTRATOR')) return;
    let checkPerms = false;
    for (const perms of settings.automod.whiteList.permissions) {
        if (message.member.permissions.has(perms)) checkPerms = true;
        else checkPerms = checkPerms;
    }
    if (checkPerms) return;
    for (const role of settings.automod.whiteList.whiteRoles) {
        if (message.member.roles.cache.has(role.id)) checkRoles = true;
        else checkRoles = checkRoles;
    }
    if (checkRoles) return;

    if(settings.automod.whiteList.channels.map(c => c.id).includes(message.channel.id)) return;

    switch (options.type) {
        case 'invite': {
            const antiinvite = options.settings.automod.antiInvite;
            if (!antiinvite.enable) break;
            else {
                const logs = options.message.guild.channels.resolve(settings.general.logs);
                if (antiinvite.onlyDelete) {
                    options.message.delete().catch(err => {})
                } else if (antiinvite.onlyWarn) {
                    const newWarns = Math.floor(userInfo.warns + 1);
                    await options.client.updateGuildUI(options.message.guild, options.message.member, {
                        "users.$.warns": newWarns
                    })
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`${check_mark}${message.author} has been warned !\nReason : Posted an invite`)
                        .setTimestamp();

                    message.channel.send({embeds: [embed]})

                    if (antiinvite.logsThis && logs !== undefined) logs.send({embeds: [embed]});
                } else if (antiinvite.warnAndDelete) {
                    console.log(4);
                    message.delete().catch(err => {console.log(err)})
                    const newWarns = Math.floor(userInfo.warns + 1);
                    await options.client.updateGuildUI(options.message.guild, options.message.member, {
                        "users.$.warns": newWarns
                    })
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`${check_mark}${message.author} has been warned !\nReason : Posted an invite`)
                        .setTimestamp()
                        .setFooter('Auto Moderation');

                    message.channel.send({embeds: [embed]}).catch(() => {})

                    if (antiinvite.logsThis && logs !== undefined) logs.send({embeds: [embed]}).catch(() => {});
                }
            }
            break;
        }
        case 'link': {
            const antilink = options.settings.automod.antiLink;
            if (!antilink.enable) break;
            else {
                const logs = options.message.guild.channels.resolve(settings.general.logs);
                if (antilink.onlyDelete) {
                    options.message.delete().catch(err => {})
                } else if (antilink.onlyWarn) {
                    const newWarns = Math.floor(userInfo.warns + 1);
                    await options.client.updateGuildUI(options.message.guild, options.message.member, {
                        "users.$.warns": newWarns
                    })
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`${check_mark}${message.author} has been warned !\nReason : Posted a link`)
                        .setTimestamp();

                    message.channel.send({embeds: [embed]})

                    if (antilink.logsThis && logs !== undefined) logs.send({embeds: [embed]});
                } else if (antilink.warnAndDelete) {
                    message.delete().catch(err => {})
                    const newWarns = Math.floor(userInfo.warns + 1);
                    await options.client.updateGuildUI(options.message.guild, options.message.member, {
                        "users.$.warns": newWarns
                    })
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setDescription(`${check_mark}${message.author} has been warned !\nReason : Posted a link`)
                        .setTimestamp()
                        .setFooter('Auto Moderation');

                    message.channel.send({embeds: [embed]}).catch(() => {})

                    if (antilink.logsThis && logs !== undefined) logs.send({embeds: [embed]}).catch(() => {});
                }
            }
            break;
        }
    }
}