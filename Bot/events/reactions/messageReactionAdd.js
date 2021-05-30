const {
    MessageEmbed
} = require('discord.js');
const functions = require('./messageReactionAdd');

module.exports = functions.reactionAdd = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const settings = await client.getGuild(message.guild)

    if (settings == undefined) settings = await client.createGuild({
        guildID: message.guild.id
    });
    const language = settings.general ? settings.general.language : 'en';
    //const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const member = message.guild.members.resolve(user.id);
    const emoji = messageReaction.emoji.name;

    const strings = language == 'en' ? client.en : (language == 'fr' ? client.fr : client.es);
    const loadingEmoji = client.emojis.resolve(client.localEmojis.loadingEmoji);
    //emoji number
    const emoji1 = client.emojis.resolve(client.localEmojis.emoji1);
    const emoji2 = client.emojis.resolve(client.localEmojis.emoji2);
    const emoji3 = client.emojis.resolve(client.localEmojis.emoji3);
    const emoji4 = client.emojis.resolve(client.localEmojis.emoji4);
    const emoji5 = client.emojis.resolve(client.localEmojis.emoji5);
    const emoji6 = client.emojis.resolve(client.localEmojis.emoji6);
    const emoji7 = client.emojis.resolve(client.localEmojis.emoji7);
    const emoji8 = client.emojis.resolve(client.localEmojis.emoji8);
    const emoji9 = client.emojis.resolve(client.localEmojis.emoji9);

    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const arrowRight = client.emojis.resolve(client.localEmojis.arrowRight);

    const tada = client.emojis.resolve(client.localEmojis.tada);
    const announcEmoji = client.emojis.resolve(client.localEmojis.warning);
    const eyesEmoji = client.emojis.resolve(client.localEmojis.alert);
    const alertEmoji = client.emojis.resolve(client.localEmojis.alert);


    if (member.user.bot) return;
    if (messageReaction.partial) {
        await messageReaction.fetch();
        if (message.partial) {
            await message.fetch()
        }
        return;
    }


    if (message.author.id == client.user.id) {
        try {
            if (message.guild.id == '727494941911154688') {
                const verifyRole = message.guild.roles.resolve('770658615752261682');
                if (message.id == '823174979608248381') {
                    member.roles.remove(verifyRole.id).then(() => {
                        member.send({
                            embed: {
                                title: 'Verification',
                                description: `${check_mark}You have been verified by accepting the rules in **_${message.guild.name}_**`
                            }
                        })
                    }).catch(err => console.log(err))
                }
                if (message.id == '823203954833227806') {
                    const givRole = message.guild.roles.resolve('822213564752330792');
                    const announRole = message.guild.roles.resolve('822500136176451684');
                    const updateRole = message.guild.roles.resolve('822500107973820466');
                    const spoilRole = message.guild.roles.resolve('822500061736337428');


                    switch (messageReaction.emoji) {
                        case tada: {
                            member.roles.add(givRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${givRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                        case announcEmoji: {
                            member.roles.add(announRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${announRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                        case alertEmoji: {
                            member.roles.add(updateRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${updateRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                        case eyesEmoji: {
                            member.roles.add(spoilRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${spoilRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                    }
                    return;
                }
            };
            if (message.embeds[0].description.startsWith("```What do you want")) {
                if (user.tag !== message.embeds[0].footer.text) return messageReaction.users.remove(user.id);
                const msg = message.channel.messages.resolve(message.embeds[0].description.slice(message.embeds[0].description.length - 18));
                if (message.embeds[0].description.toLowerCase().includes("role") || message.embeds[0].description.toLowerCase().includes("rôle")) {
                    if (emoji == '🇦') {
                        try {
                            message.edit(strings.configuration.chooseRoleAdd);
                            message.reactions.removeAll();
                            const filter = m => m.author.id == user.id;
                            const userE = await message.channel.awaitMessages(filter, {
                                max: 1,
                                errors: ['time'],
                                time: 20000
                            });
                            let roles = userE.first().mentions.roles;
                            if (!roles.size) throw new Error('test');
                            else {
                                roles.forEach(async r => {
                                    if (settings.automod.whiteList.whiteRoles.map(ro => ro.id).includes(r.id)) roles = roles.filter(ro => ro.id !== r.id);
                                    await client.updateGuild(message.guild, {
                                        $push: {
                                            "automod.whiteList.whiteRoles": {
                                                id: r.id
                                            }
                                        }
                                    })
                                })
                                userE.first().delete().catch((err) => {});
                                message.delete();
                                const embed = new MessageEmbed()
                                    .setTitle(msg.embeds[0].title)
                                    .setDescription(msg.embeds[0].description)
                                    .setFooter(msg.embeds[0].footer.text, msg.embeds[0].footer.iconURL)
    
                                for (const field of msg.embeds[0].fields) {
                                    embed.addField(field.name, field.name.includes("4️⃣") ? field.value + ", " + roles.map(r => `<@&${r.id}>`).join(", ") : field.value)
                                }
                                msg.edit(embed)
                            }
                        } catch (e) {
                            message.channel.send({
                                embed: {
                                    description: `${strings.cmdCancel}`,
                                    title: strings.configuration.err
                                }
                            })
                        }
                    } else if (emoji == "🇧") {
                        try {
                            message.edit(strings.configuration.chooseRoleRem);
                            message.reactions.removeAll();
                            const filter = m => m.author.id == user.id;
                            const userE = await message.channel.awaitMessages(filter, {
                                max: 1,
                                errors: ['time'],
                                time: 20000
                            });
                            let roles = userE.first().mentions.roles;
                            if (!roles.size) throw new Error('test');
                            else {
                                roles.forEach(async r => {
                                    if (!settings.automod.whiteList.whiteRoles.map(ro => ro.id).includes(r.id)) roles = roles.filter(ro => ro.id !== r.id);
                                    await client.updateGuild(message.guild, {
                                        $pull: {
                                            "automod.whiteList.whiteRoles": {
                                                id: r.id
                                            }
                                        }
                                    })
                                })
                                userE.first().delete().catch((err) => {});
                                message.delete();
                                const embed = new MessageEmbed()
                                    .setTitle(msg.embeds[0].title)
                                    .setDescription(msg.embeds[0].description)
                                    .setFooter(msg.embeds[0].footer.text, msg.embeds[0].footer.iconURL)
    
                                for (const field of msg.embeds[0].fields) {
                                    embed.addField(field.name, field.name.includes("4️⃣") ? settings.automod.whiteList.whiteRoles.filter(r => !(roles.map(ro => ro.id).includes(r.id))).map(r => `<@&${r.id}>`).join(", ") : field.value)
                                }
                                msg.edit(embed)
                            }
                        } catch (e) {
                            message.channel.send({
                                embed: {
                                    description: `${strings.cmdCancel}`,
                                    title: strings.configuration.err
                                }
                            })
                        }
                    }
                } else if (message.embeds[0].description.toLowerCase().includes("channel") || message.embeds[0].description.toLowerCase().includes("salon")) {
                    if (emoji == '🇦') {
                        try {
                            message.edit(strings.configuration.chooseChannelAdd);
                            message.reactions.removeAll();
                            const filter = m => m.author.id == user.id;
                            const userE = await message.channel.awaitMessages(filter, {
                                max: 1,
                                errors: ['time'],
                                time: 20000
                            });
                            let channels = userE.first().mentions.channels;
                            if (!channels.size) throw new Error('test');
                            else {
                                channels.forEach(async c => {
                                    if (settings.automod.whiteList.channels.map(ch => ch.id).includes(c.id)) channels = channels.filter(ch => ch.id !== c.id);
                                    await client.updateGuild(message.guild, {
                                        $push: {
                                            "automod.whiteList.channels": {
                                                id: c.id
                                            }
                                        }
                                    })
                                })
                                userE.first().delete().catch((err) => {});
                                message.delete();
                                const embed = new MessageEmbed()
                                    .setTitle(msg.embeds[0].title)
                                    .setDescription(msg.embeds[0].description)
                                    .setFooter(msg.embeds[0].footer.text, msg.embeds[0].footer.iconURL)
    
                                for (const field of msg.embeds[0].fields) {
                                    embed.addField(field.name, field.name.includes("4️⃣") ? field.value + ", " + channels.map(c => `<@#${c.id}>`).join(", ") : field.value)
                                }
                                msg.edit(embed)
                            }
                        } catch (e) {
                            message.channel.send({
                                embed: {
                                    description: `${strings.cmdCancel}`,
                                    title: strings.configuration.err
                                }
                            })
                        }
                    } else if (emoji == "🇧") {
                        try {
                            message.edit(strings.configuration.chooseChannelRem);
                            message.reactions.removeAll();
                            const filter = m => m.author.id == user.id;
                            const userE = await message.channel.awaitMessages(filter, {
                                max: 1,
                                errors: ['time'],
                                time: 20000
                            });
                            let channels = userE.first().mentions.channels;
                            if (!channels.size) throw new Error('test');
                            else {
                                channels.forEach(async c => {
                                    if (!settings.automod.whiteList.channels.map(ch => ch.id).includes(c.id)) channels = channels.filter(ch => ch.id !== c.id);
                                    await client.updateGuild(message.guild, {
                                        $pull: {
                                            "automod.whiteList.channels": {
                                                id: c.id
                                            }
                                        }
                                    })
                                })
                                userE.first().delete().catch((err) => {});
                                message.delete();
                                const embed = new MessageEmbed()
                                    .setTitle(msg.embeds[0].title)
                                    .setDescription(msg.embeds[0].description)
                                    .setFooter(msg.embeds[0].footer.text, msg.embeds[0].footer.iconURL)
    
                                for (const field of msg.embeds[0].fields) {
                                    embed.addField(field.name, field.name.includes("4️⃣") ? settings.automod.whiteList.channels.filter(c => !(channels.map(ch => ch.id).includes(c.id))).map(c => `<@#${c.id}>`).join(", ") : field.value)
                                }
                                msg.edit(embed)
                            }
                        } catch (e) {
                            message.channel.send({
                                embed: {
                                    description: `${strings.cmdCancel}`,
                                    title: strings.configuration.err
                                }
                            })
                        }
                    }
                }
                return;
            }
            if (message.embeds[0].title.startsWith("Anti-") || message.embeds[0].title.startsWith("Auto-")) {
                if (user.tag !== message.embeds[0].footer.text) return;
                const system = message.embeds[0].title.toLowerCase().replace("-", "");
                const embed = new MessageEmbed()
                    .setTitle(message.embeds[0].title)
                    .setFooter(message.embeds[0].footer.text, message.embeds[0].footer.icon);
                embed.setDescription(strings.configuration.reset);
                switch (system) {
                    case 'automoderation': {
                        embed.setDescription(embed.description.replace("{type}", 'Auto-Moderation'))
                        async function func() {
                            switch (emoji) {
                                case '🔄': {
                                    for (const field of message.embeds[0].fields) {
                                        embed.addField(field.name, field.name.includes("3️⃣") || field.name.includes("2️⃣") ? `🟢` : (field.name.includes("1️⃣") ? '🔴' : '\u200b'))
                                    }
                                    embed.setDescription(strings.configuration.afterReset);
                                    await client.updateGuild(message.guild, {
                                        "automod.enable": false,
                                        "automod.whiteList.bots": true,
                                        "automod.whiteList.admin": true,
                                        "automod.whiteList.whiteRoles": [],
                                        "automod.whiteList.channels": []
                                    })
                                    break;
                                }
                                case '1️⃣': {
                                    if (settings.automod.enable) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("1️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.enable": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("1️⃣") ? `🟢` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.enable": true
                                        })
                                    }
                                    break;
                                }
                                case '2️⃣': {
                                    if (settings.automod.whiteList.admin) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("2️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.whiteList.admin": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("2️⃣") ? `🟢` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.whiteList.admin": true
                                        })
                                    }
                                    break;
                                }
                                case '3️⃣': {
                                    if (settings.automod.whiteList.bots) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("3️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.whiteList.bots": false,
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("3️⃣") ? `🟢` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.whiteList.bots": true
                                        })
                                    }
                                    break;
                                }
                                case '4️⃣': {
                                    if (settings.automod.whiteList.whiteRoles.length > 0) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.value)
                                        };
                                        message.channel.send({embed: {
                                            description: `${strings.configuration.remOrAddRole}\n\nMessage ID : ${message.id}`,
                                            footer: {text: user.tag, icon: user.displayAvatarURL({ dynamic: true })}
                                        }}).then(msg => {
                                            msg.react("🇦");
                                            msg.react("🇧")
                                        })
                                    } else {
                                        try {
                                            const msg = message.channel.send(strings.configuration.chooseRoleAdd);
                                            const filter = m => m.author.id == user.id;
                                            const userE = await message.channel.awaitMessages(filter, {
                                                max: 1,
                                                errors: ['time'],
                                                time: 20000
                                            });
                                            let roles = userE.first().mentions.roles;
                                            if (!roles.size) throw new Error('test');
                                            else {
                                                roles.forEach(async r => {
                                                    if (settings.automod.whiteList.whiteRoles.map(ro => ro.id).includes(r.id)) roles = roles.filter(ro => ro.id !== r.id);
                                                    await client.updateGuild(message.guild, {
                                                        $push: {
                                                            "automod.whiteList.whiteRoles": {
                                                                id: r.id
                                                            }
                                                        }
                                                    })
                                                })
                                                userE.first().delete().catch((err) => {});
                                                msg.delete();
                                                const embed = new MessageEmbed()
                                                    .setTitle(message.embeds[0].title)
                                                    .setDescription(message.embeds[0].description)
                                                    .setFooter(message.embeds[0].footer.text, message.embeds[0].footer.iconURL)
                    
                                                for (const field of message.embeds[0].fields) {
                                                    embed.addField(field.name, field.name.includes("4️⃣") ? field.value + ", " + roles.map(r => `<@&${r.id}>`).join(", ") : field.value)
                                                }
                                                message.edit(embed)
                                            }
                                        } catch (e) {
                                            message.channel.send({
                                                embed: {
                                                    description: `${strings.cmdCancel}`,
                                                    title: strings.configuration.err
                                                }
                                            })
                                        }
                                    }
                                    break;
                                }
                                case '5️⃣': {
                                    if (settings.automod.whiteList.channels.length > 0) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.value)
                                        };
                                        message.channel.send({embed: {
                                            description: `${strings.configuration.remOrAddChannel}\n\nMessage ID : ${message.id}`,
                                            footer: {text: user.tag, icon: user.displayAvatarURL({ dynamic: true })}
                                        }}).then(msg => {
                                            msg.react("🇦");
                                            msg.react("🇧")
                                        })
                                    } else {
                                        try {
                                            const msg = message.channel.send(strings.configuration.chooseChannelAdd);
                                            const filter = m => m.author.id == user.id;
                                            const userE = await message.channel.awaitMessages(filter, {
                                                max: 1,
                                                errors: ['time'],
                                                time: 20000
                                            });
                                            let channels = userE.first().mentions.channels;
                                            if (!channels.size) throw new Error('test');
                                            else {
                                                channels.forEach(async c => {
                                                    if (settings.automod.whiteList.channels.map(ch => ch.id).includes(c.id)) channels = channels.filter(ch => ch.id !== c.id);
                                                    await client.updateGuild(message.guild, {
                                                        $push: {
                                                            "automod.whiteList.channels": {
                                                                id: c.id
                                                            }
                                                        }
                                                    })
                                                })
                                                userE.first().delete().catch((err) => {});
                                                msg.delete();
                                                const embed = new MessageEmbed()
                                                    .setTitle(message.embeds[0].title)
                                                    .setDescription(message.embeds[0].description)
                                                    .setFooter(message.embeds[0].footer.text, message.embeds[0].footer.iconURL)
                    
                                                for (const field of message.embeds[0].fields) {
                                                    embed.addField(field.name, field.name.includes("5️⃣") ? field.value + ", " + channels.map(c => `<@#${c.id}>`).join(", ") : field.value)
                                                }
                                                message.edit(embed)
                                            }
                                        } catch (e) {
                                            message.channel.send({
                                                embed: {
                                                    description: `${strings.cmdCancel}`,
                                                    title: strings.configuration.err
                                                }
                                            })
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        await func()
                        messageReaction.users.remove(user)
                        await message.edit(embed);
                        break;
                    }
                    case 'antiinvite': {
                        embed.setDescription(embed.description.replace("{type}", 'Anti-Invite'));
                        async function func() {
                            switch (emoji) {
                                case '🔄': {
                                    for (const field of message.embeds[0].fields) {
                                        embed.addField(field.name, field.name.includes("3️⃣") ? `🟢` : `🔴`)
                                    }
                                    embed.setDescription(strings.configuration.afterReset);
                                    await client.updateGuild(message.guild, {
                                        "automod.antiInvite.enable": false,
                                        "automod.antiInvite.onlyWarn": false,
                                        "automod.antiInvite.onlyDelete": true,
                                        "automod.antiInvite.warnAndDelete": false,
                                        "automod.antiInvite.logsThis": false
                                    })
                                    break;
                                }
                                case '1️⃣': {
                                    if (settings.automod.antiInvite.enable) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("1️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.enable": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("1️⃣") ? `🟢` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.enable": true
                                        })
                                    }
                                    break;
                                }
                                case '2️⃣': {
                                    if (settings.automod.antiInvite.logsThis) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("2️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.logsThis": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("2️⃣") ? `🟢` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.logsThis": true
                                        })
                                    }
                                    break;
                                }
                                case '3️⃣': {
                                    if (settings.automod.antiInvite.onlyDelete) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("3️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.onlyDelete": false,
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("3️⃣") ? `🟢` : (field.name.includes("5️⃣") || field.name.includes("4️⃣") ? '🔴' : field.value))
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.onlyDelete": true,
                                            "automod.antiInvite.onlyWarn": false,
                                            "automod.antiInvite.warnAndDelete": false
                                        })
                                    }
                                    break;
                                }
                                case '4️⃣': {
                                    if (settings.automod.antiInvite.onlyWarn) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("4️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.onlyWarn": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("4️⃣") ? `🟢` : (field.name.includes("5️⃣") || field.name.includes("3️⃣") ? '🔴' : field.value))
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.onlyDelete": false,
                                            "automod.antiInvite.onlyWarn": true,
                                            "automod.antiInvite.warnAndDelete": false
                                        })
                                    }
                                    break;
                                }
                                case '5️⃣': {
                                    if (settings.automod.antiInvite.warnAndDelete) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("5️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.warnAndDelete": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("5️⃣") ? `🟢` : (field.name.includes("4️⃣") || field.name.includes("3️⃣") ? '🔴' : field.value))
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiInvite.onlyDelete": false,
                                            "automod.antiInvite.onlyWarn": false,
                                            "automod.antiInvite.warnAndDelete": true
                                        })
                                    }
                                    break;
                                }
                            }
                        }
                        await func()
                        messageReaction.users.remove(user)
                        await message.edit(embed);
                        break;
                    }
                    case 'antilink': {
                        embed.setDescription(embed.description.replace("{type}", 'Anti-Link'));
                        async function func() {
                            switch (emoji) {
                                case '🔄': {
                                    for (const field of message.embeds[0].fields) {
                                        embed.addField(field.name, field.name.includes("3️⃣") ? `🟢` : `🔴`)
                                    }
                                    embed.setDescription(strings.configuration.afterReset);
                                    await client.updateGuild(message.guild, {
                                        "automod.antiLink.enable": false,
                                        "automod.antiLink.onlyWarn": false,
                                        "automod.antiLink.onlyDelete": true,
                                        "automod.antiLink.warnAndDelete": false,
                                        "automod.antiLink.logsThis": false
                                    })
                                    break;
                                }
                                case '1️⃣': {
                                    if (settings.automod.antiLink.enable) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("1️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.enable": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("1️⃣") ? `🟢` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.enable": true
                                        })
                                    }
                                    break;
                                }
                                case '2️⃣': {
                                    if (settings.automod.antiLink.logsThis) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("2️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.logsThis": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("2️⃣") ? `🟢` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.logsThis": true
                                        })
                                    }
                                    break;
                                }
                                case '3️⃣': {
                                    if (settings.automod.antiLink.onlyDelete) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("3️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.onlyDelete": false,
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("3️⃣") ? `🟢` : (field.name.includes("5️⃣") || field.name.includes("4️⃣") ? '🔴' : field.value))
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.onlyDelete": true,
                                            "automod.antiLink.onlyWarn": false,
                                            "automod.antiLink.warnAndDelete": false
                                        })
                                    }
                                    break;
                                }
                                case '4️⃣': {
                                    if (settings.automod.antiLink.onlyWarn) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("4️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.onlyWarn": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("4️⃣") ? `🟢` : (field.name.includes("5️⃣") || field.name.includes("3️⃣") ? '🔴' : field.value))
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.onlyDelete": false,
                                            "automod.antiLink.onlyWarn": true,
                                            "automod.antiLink.warnAndDelete": false
                                        })
                                    }
                                    break;
                                }
                                case '5️⃣': {
                                    if (settings.automod.antiLink.warnAndDelete) {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("5️⃣") ? `🔴` : field.value)
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.warnAndDelete": false
                                        })
                                    } else {
                                        for (const field of message.embeds[0].fields) {
                                            embed.addField(field.name, field.name.includes("5️⃣") ? `🟢` : (field.name.includes("4️⃣") || field.name.includes("3️⃣") ? '🔴' : field.value))
                                        }
                                        await client.updateGuild(message.guild, {
                                            "automod.antiLink.onlyDelete": false,
                                            "automod.antiLink.onlyWarn": false,
                                            "automod.antiLink.warnAndDelete": true
                                        })
                                    }
                                    break;
                                }
                            }
                        }
                        await func()
                        messageReaction.users.remove(user)
                        await message.edit(embed);
                        break;
                    }
                };
            }


            if (messageReaction.emoji == tada) {
                if (!message.embeds[0].author.name.startsWith('🎉🎉Givea')) return;
                if (message.embeds[0].author.name.includes('🎉🎉Giveaway🎉🎉')) {
                    const giveaway = await client.getGiveaway(message.guild, message.id);
                    const embed = new MessageEmbed()
                        .setDescription(`${tada}Giveaway entry accepted for \`${message.embeds[0].title}\`${tada}`)
                        .setAuthor(user.username, user.avatarURL(), `${client.botGuild.inviteLink}`)
                        .setTitle('Giveaway Entry')
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#FFFFFF')
                        .setURL('https://discord.gg/unRX2SUcvw');
                    try {
                        user.send(embed)
                    } catch (e) {
                        console.log(e);
                    }
                };
            }
            if (message.content !== '') {
                if (emoji == '❌' && (message.content.includes('React to get a category') || message.content.includes('Click ↩️ for return to home')) && message.content.startsWith(user.tag)) {
                    if (message !== undefined) message.delete().catch(err => {})
                }
                if (message.content.includes('React to get a category') && emoji !== '❌' && message.content.startsWith(user.tag)) {
                    const embed = new MessageEmbed()
                        .setColor("#000000")
                        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                        .setURL(`${client.botGuild.supportInvite}`)
                        .setTimestamp()
                        .setFooter(`Requested by ${user.tag}`)
                        .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! `);


                    switch (messageReaction.emoji) {
                        case emoji1: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'configuration').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Server Settings");
                            break;
                        }
                        case emoji2: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'moderation').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Moderation");
                            break;
                        }
                        case emoji3: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'level').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Level");
                            break;
                        }
                        case emoji4: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'info').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Info");
                            break;
                        }
                        case emoji5: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'economy').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Economy");
                            break;
                        }
                        case emoji6: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'giveaway').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Giveaway");
                            break;
                        }
                        case emoji7: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'other').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Other");
                            break;
                        }
                        case emoji8: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'counts').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Count channels");
                            break;
                        }
                    }
                    if (message !== undefined) {
                        if (message.guild.me.permissions.has('ADMINISTRATOR')) await message.reactions.removeAll();
                        else await message.reactions.cache.forEach(r => r.users.remove(client.user.id))

                        await message.edit(`${user.tag}, Click ↩️ for return to home!`, embed).then(async msg => {
                            await msg.react('↩️');
                            await msg.react('❌');
                        })
                    }
                }

                if (emoji === "↩️" && message.content.includes('Click ↩️ for return to home') && message.content.startsWith(user.tag)) {
                    if (message !== undefined) {
                        if (message.guild.me.permissions.has('ADMINISTRATOR')) await message.reactions.removeAll();
                        else await message.reactions.cache.forEach(r => r.users.remove(client.user.id))
                        const embed = new MessageEmbed()
                            .setColor("#000000")
                            .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                            .setTitle("Bot Commands")
                            .setURL(`${client.botGuild.supportInvite}`)
                            .setDescription(`Loading commands${loadingEmoji}`)
                            .setTimestamp()
                            .setFooter(message.guild.name);
                        const embed2 = new MessageEmbed()
                            .setColor("#000000")
                            .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                            .setTitle("Bot Commands")
                            .setURL(`${client.botGuild.supportInvite}`)
                            .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>!`)
                            .setTimestamp()
                            .setFooter(`React with ❌ to cancel command | Requested by ${user.tag}`)



                        embed2.addFields({
                            name: `${emoji1} Server settings :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji2} Moderation :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji3} Level :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji4} Info :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji5} Economy :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji6} Giveaway :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji7} Other :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji8} Count :`,
                            value: `\u200b`
                        });

                        await message.edit(embed).then(async message => {
                            await message.reactions.removeAll();
                            await message.react(emoji1).catch(() => {});
                            await message.react(emoji2).catch(() => {});
                            await message.react(emoji3).catch(() => {});
                            await message.react(emoji4).catch(() => {});
                            await message.react(emoji5).catch(() => {});
                            await message.react(emoji6).catch(() => {});
                            await message.react(emoji7).catch(() => {});
                            await message.react(emoji8).catch(() => {})
                            await message.react('❌').catch(() => {})
                        }).then(setTimeout(() => {
                            message.edit(`${user.tag}, React to get a category's commands`, embed2)
                        }, 10000))
                    }; //pour la commande help jusqu'à ici
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};