const {
    getStrings,
    categories
} = require("../../../../util/constants");
const {
    Client
} = require("../../../../util/functions");
const {
    MessageEmbed,
    MessageAttachment,
    MessageReaction,
    User,
    MessageActionRow,
    MessageButton
} = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {MessageReaction} messageReaction 
 * @param {User} user 
 * @returns 
 */
module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message;

    const settings = await client.getGuild(message.guild)

    if (settings == undefined) settings = await client.createGuild({
        guildID: message.guild.id
    });

    const language = settings.general ? settings.general.language : 'en';
    //const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const member = message.guild.members.resolve(user.id);
    const emoji = messageReaction.emoji.name;

    const strings = await getStrings(client, language);
    const loadingEmoji = client.emojis.resolve(client.localEmojis.loadingEmoji);
    //emoji number
    // const emoji1 = client.emojis.resolve(client.localEmojis.emoji1);
    // const emoji2 = client.emojis.resolve(client.localEmojis.emoji2);
    // const emoji3 = client.emojis.resolve(client.localEmojis.emoji3);
    // const emoji4 = client.emojis.resolve(client.localEmojis.emoji4);
    // const emoji5 = client.emojis.resolve(client.localEmojis.emoji5);
    // const emoji6 = client.emojis.resolve(client.localEmojis.emoji6);
    // const emoji7 = client.emojis.resolve(client.localEmojis.emoji7);
    // const emoji8 = client.emojis.resolve(client.localEmojis.emoji8);
    // const emoji9 = client.emojis.resolve(client.localEmojis.emoji9);
    const emojiArr = [];

    for (const cat of categories) {
        const emj = client.emojis.resolve(cat.emoji);
        emojiArr.push(emj)
    }
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const arrowRight = client.emojis.resolve(client.localEmojis.arrowRight);

    const txtColor1 = settings.general.apparence == "light" ? "#000000" : "#ffffff";
    const txtColor2 = settings.general.apparence == "light" ? "darkblue" : "darkblue";

    const tada = client.emojis.resolve(client.localEmojis.tada);
    const announcEmoji = client.emojis.resolve(client.localEmojis.warning);
    const eyesEmoji = client.emojis.resolve(client.localEmojis.alert);
    const alertEmoji = client.emojis.resolve(client.localEmojis.alert);

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
                    embeds: [{
                        description: `${strings.cmdCancel}`,
                        title: strings.configuration.err
                    }]
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
                    embeds: [{
                        description: `${strings.cmdCancel}`,
                        title: strings.configuration.err
                    }]
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
                    embeds: [{
                        description: `${strings.cmdCancel}`,
                        title: strings.configuration.err
                    }]
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
                    embeds: [{
                        description: `${strings.cmdCancel}`,
                        title: strings.configuration.err
                    }]
                })
            }
        }
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
                                message.channel.send({
                                    embeds: [{
                                        description: `${strings.configuration.remOrAddRole}\n\nMessage ID : ${message.id}`,
                                        footer: {
                                            text: user.tag,
                                            icon: user.displayAvatarURL({
                                                dynamic: true
                                            })
                                        }
                                    }]
                                }).then(msg => {
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
                                        message.edit({
                                            embeds: [embed]
                                        })
                                    }
                                } catch (e) {
                                    message.channel.send({
                                        embeds: [{
                                            description: `${strings.cmdCancel}`,
                                            title: strings.configuration.err
                                        }]
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
                                message.channel.send({
                                    embeds: [{
                                        description: `${strings.configuration.remOrAddChannel}\n\nMessage ID : ${message.id}`,
                                        footer: {
                                            text: user.tag,
                                            icon: user.displayAvatarURL({
                                                dynamic: true
                                            })
                                        }
                                    }]
                                }).then(msg => {
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
                                        message.edit({
                                            embeds: [embed]
                                        })
                                    }
                                } catch (e) {
                                    message.channel.send({
                                        embeds: [{
                                            description: `${strings.cmdCancel}`,
                                            title: strings.configuration.err
                                        }]
                                    })
                                }
                            }
                            break;
                        }
                    }
                }
                func()
                messageReaction.users.remove(user)
                message.edit({
                    embeds: [embed]
                });
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
                func()
                messageReaction.users.remove(user)
                message.edit({
                    embeds: [embed]
                });
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
                func()
                messageReaction.users.remove(user)
                message.edit({
                    embeds: [embed]
                });
                break;
            }
        };
    }
}