"use strict";
const {
    Client
} = require('../../../util/functions');
const moment = require('moment')
const {
    Interaction,
    MessageComponentInteraction,
    MessageEmbed,
    MessageAttachment,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
    getStrings,
    categories
} = require('../../../util/constants');
const cats = categories.slice(0, 25);
const {
    createCanvas,
    loadImage
} = require('canvas');
/**
 * 
 * @param {Client} client 
 * @param {MessageComponentInteraction} interaction 
 */
module.exports = async (client, interaction) => {
    const user = interaction.user;
    const message = interaction.message;
    const settings = await client.getGuild(interaction.guild);
    const language = settings.general.language;
    const strings = await getStrings(client, language);
    const beforeEmbed = message ? message.embeds[0] : null;
    const emojis = {
        1: client.emojis.resolve(client.localEmojis.emoji1),
        2: client.emojis.resolve(client.localEmojis.emoji2),
        3: client.emojis.resolve(client.localEmojis.emoji3),
        4: client.emojis.resolve(client.localEmojis.emoji4),
        5: client.emojis.resolve(client.localEmojis.emoji5),
        6: client.emojis.resolve(client.localEmojis.emoji6),
        7: client.emojis.resolve(client.localEmojis.emoji7),
        8: client.emojis.resolve(client.localEmojis.emoji8),
        9: client.emojis.resolve(client.localEmojis.emoji9),
        loadingEmoji: client.emojis.resolve(client.localEmojis.loadingEmoji)
    }
    let replyContent = '\u200b';
    switch (interaction.type) {
        case 'APPLICATION_COMMAND': {
            switch (interaction.commandName) {
                case 'ping': {
                    interaction.reply(`Pong - ${client.ws.ping}ms`);
                    break;
                }
            }
            break;
        }
        case 'MESSAGE_COMPONENT': {
            try {
                const blackListedIDs = [{
                    id: 'delete'
                }];
                const userInfo = await client.getGuildUser(message.guild, user);
                // const IDs = ["NONE", "help-home", "delete", "help-left", "help-right"];
                const embed = new MessageEmbed();
                const row = new MessageActionRow();
                const loadingEmbed = new MessageEmbed()
                    .setTitle(strings.help.bCommands)
                    .setDescription(`${strings.loading}${emojis.loadingEmoji}`)
                console.log(interaction.customId);
                await interaction.update({
                    embeds: [loadingEmbed]
                });
                if (interaction.customId.startsWith("help")) {
                    // const txtColor1 = settings.general.apparence == "light" ? "#000000" : "#ffffff";
                    // const txtColor2 = settings.general.apparence == "light" ? "darkblue" : "darkblue";
                    // let canvas = createCanvas(2000, 2000);
                    // let ctx = canvas.getContext("2d");

                    // const img = await loadImage(`./Bot/Assets/${settings.general.apparence}.png`);

                    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    embed
                        .setColor("#000000")
                        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                        .setURL(`${client.botGuild.supportInvite}`)
                        .setTimestamp()
                        .setTitle(strings.help.bCommands)
                        .setDescription(user.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)));

                    row
                        .addComponents(
                            new MessageButton()
                            .setCustomId('help-home')
                            .setStyle('SUCCESS')
                            .setEmoji("🏠"),
                        );
                    embed.setDescription((embed.description ? embed.description + '\n\n' : '') + `${strings.help.sommaire}`)
                    if (interaction.customId == 'NONE') return interaction.editReply({
                        embeds: [beforeEmbed]
                    })
                    else if (interaction.customId == 'delete') {
                        if (message.partial) await message.fetch(true);
                        return await message.delete();
                    }
                    else {
                        if (interaction.customId == 'help-home') {
                            // canvas = await client.drawHelpHome(canvas, ctx, {
                            //     page: 1,
                            //     txtColor1,
                            //     txtColor2
                            // });
                            for (const cat of cats) {
                                embed.addField(`${await client.emojis.resolve(cat.emoji)} • ${cat.name[language]}`, `\`\`\`md\n# ${cat.description[language]}\`\`\``);
                            }
                            embed.setFooter('Page 1');
                            row.components[0].setDisabled(true).setStyle("SECONDARY").setCustomId('NONE')
                            row.addComponents(
                                new MessageButton()
                                .setDisabled(true)
                                .setCustomId("NONE")
                                .setStyle('SECONDARY')
                                .setEmoji("⬅️"),
                                new MessageButton()
                                .setCustomId(((categories.length / 25) > 1) ? 'help-right-home1' : 'NONE')
                                .setStyle(((categories.length / 25) > 1) ? 'PRIMARY' : 'SECONDARY')
                                .setEmoji("➡️")
                                .setDisabled(((categories.length / 25) > 1) ? false : true),
                            )
                        } else {
                            if (interaction.customId.startsWith("help-right-home")) {
                                const page = parseInt(interaction.customId.slice(interaction.customId.length - 1))
                                const nxtPage = page + 1;
                                if ((categories.length / 25) == 1 || (categories.length / 25) == 0 || ((categories.length / 25) + 1) < nxtPage) return interaction.editReply({
                                    embeds: [beforeEmbed]
                                })
                                row.addComponents(
                                    new MessageButton()
                                    .setCustomId('help-left-home' + nxtPage)
                                    .setStyle('PRIMARY')
                                    .setEmoji("⬅️"),
                                    new MessageButton()
                                    .setCustomId('help-right-home' + nxtPage)
                                    .setStyle('PRIMARY')
                                    .setEmoji("➡️"),
                                )
                                // canvas = await client.drawHelpHome(canvas, ctx, {
                                //     page: nxtPage,
                                //     txtColor1,
                                //     txtColor2
                                // });
                                for (const cat of categories.slice((25 * (nxtPage - 1)), (25 * (nxtPage)))) {
                                    embed.addField(`${await client.emojis.resolve(cat.emoji)} • ${cat.name[language]}`, `\`\`\`md\n# ${cat.description[language]}\`\`\``);
                                }
                                embed.setFooter("Page " + nxtPage);
                                if (nxtPage >= (categories.length / 25)) row.components[2].setStyle("SECONDARY").setCustomId('NONE').setDisabled(true);
                            } else if (interaction.customId.startsWith("help-left-home")) {
                                const page = parseInt(interaction.customId.slice(interaction.customId.length - 1))
                                const nxtPage = page - 1;
                                if ((categories.length / 25) == 1 || (categories.length / 25) == 0 || ((categories.length / 25)) < nxtPage) return interaction.editReply({
                                    embeds: [beforeEmbed]
                                })
                                row.addComponents(
                                    new MessageButton()
                                    .setCustomId('help-left-home' + nxtPage)
                                    .setStyle('PRIMARY')
                                    .setEmoji("⬅️"),
                                    new MessageButton()
                                    .setCustomId('help-right-home' + nxtPage)
                                    .setStyle("PRIMARY")
                                    .setEmoji("➡️"),
                                )
                                for (const cat of categories.slice((25 * (nxtPage - 1)), (25 * nxtPage))) {
                                    embed.addField(`${await client.emojis.resolve(cat.emoji)} • ${cat.name[language]}`, `\`\`\`md\n# ${cat.description[language]}\`\`\``);
                                }
                                // canvas = await client.drawHelpHome(canvas, ctx, {
                                //     page: nxtPage,
                                //     txtColor1,
                                //     txtColor2
                                // });
                                if (nxtPage == 1) row.components[0].setStyle("SECONDARY").setDisabled(true).setCustomId("NONE"), row.components[1].setStyle("SECONDARY").setDisabled(true).setCustomId("NONE");
                                embed.setFooter("Page " + nxtPage);
                                // if (nxtPage >= (categories.length / 25)) row.components[2].setStyle("SECONDARY");
                            } else {
                                if (interaction.customId.startsWith('help-left-cats')) {
                                    const pos = interaction.customId.slice('help-left-cats'.length);
                                    const newCat = categories.find(e => e.position == (parseInt(pos) - 1))
                                    // canvas = await client.drawHelpCats(canvas, ctx, newCat, {
                                    //     txtColor1, txtColor2
                                    // })
                                    const cmds = await client.commands.filter(cmd => cmd.help.category === newCat.commandsCat);
                                    const leftCmds = [];
                                    let leftPage = 0;
                                    for (const cmd of cmds) {
                                        leftCmds.push(cmd);
                                    }
                                    leftPage = Math.round((leftCmds.length / 25) + 0.50)
                                    embed.setTitle(strings.help.bCommands + "\n" + newCat.name[language])
                                        .setFooter(user.tag, user.avatarURL({
                                            dynamic: true
                                        }))
                                        .setDescription((embed.description ? embed.description : '') + `${embed.description.includes(strings.help.sommaire) ? '' : '\n\n' + strings.help.sommaire}`)
                                    for (const underCat of newCat.underCat) {
                                        const emj = client.emojis.resolve(underCat.emoji);
                                        const strs = underCat.description[settings.general.language];
                                        embed.addField(`${emj} • ${underCat.name[settings.general.language]}`, `\`\`\`yaml\n${strs}\`\`\``)
                                    }
                                    // canvas = await client.drawHelpCats(canvas, ctx, newCat, {
                                    //   txtColor1, txtColor2
                                    // })
                                    for (let cmd of cmds) {
                                        cmd = cmd[1];
                                        if (cmd !== undefined && cmd.help.enable) {
                                            if (cmd.underCat) {
                                                const field = embed.fields.find(f => f.name.toString().toLowerCase().includes(cmd.underCat.emoji))
                                                if (field) field.value = field.value + '\n' + `\`${cmd.help.name}\` - ${cmd.help.description[language]}`;
                                                else embed.setDescription((embed.description == null ? '' : `${embed.description} \n`) + `\`${cmd.help.name}\` - ${cmd.help.description[language]}`)
                                            } else embed.setDescription((embed.description == null ? '' : `${embed.description} \n`) + `\`${cmd.help.name}\` - ${cmd.help.description[language]}`)
                                        }
                                    }
                                    embed.fields = embed.fields.filter(f => !f.value.endsWith("`"))
                                    row.addComponents(
                                        new MessageButton()
                                        .setCustomId(newCat.position <= 1 ? 'NONE' : 'help-left-cats' + newCat.position)
                                        .setStyle(newCat.position <= 1 ? 'SECONDARY' : 'PRIMARY')
                                        .setEmoji("⬅️")
                                        .setDisabled(newCat.position <= 1 ? true : false),
                                        new MessageButton()
                                        .setCustomId(newCat.position == categories.length ? 'NONE' : 'help-right-cats' + newCat.position)
                                        .setStyle(newCat.position == categories.length ? 'SECONDARY' : 'PRIMARY')
                                        .setEmoji("➡️")
                                        .setDisabled(newCat.position == categories.length ? true : false),
                                    )
                                    if (embed.description.endsWith("```") && embed.fields.length < 1) embed.setDescription(embed.description + `\n\n` + strings.help.noCmd)
                                } else if (interaction.customId.startsWith('help-right-cats')) {
                                    const pos = interaction.customId.slice('help-right-cats'.length);
                                    const newCat = categories.find(e => e.position == (parseInt(pos) + 1))
                                    // canvas = await client.drawHelpCats(canvas, ctx, newCat, {
                                    //     txtColor1, txtColor2
                                    // })
                                    const cmds = await client.commands.filter(cmd => cmd.help.category === newCat.commandsCat);
                                    const leftCmds = [];
                                    let leftPage = 0;
                                    for (const cmd of cmds) {
                                        leftCmds.push(cmd);
                                    }
                                    leftPage = Math.round((leftCmds.length / 25) + 0.50)
                                    embed.setTitle(strings.help.bCommands + "\n" + newCat.name[language])
                                        .setFooter(user.tag, user.avatarURL({
                                            dynamic: true
                                        }))
                                        .setDescription((embed.description ? embed.description : '') + `${embed.description.includes(strings.help.sommaire) ? '' : '\n\n' + strings.help.sommaire}`)
                                    for (const underCat of newCat.underCat) {
                                        const emj = client.emojis.resolve(underCat.emoji);
                                        const strs = underCat.description[settings.general.language];
                                        embed.addField(`${emj} • ${underCat.name[settings.general.language]}`, `\`\`\`yaml\n${strs}\`\`\``)
                                    }
                                    // canvas = await client.drawHelpCats(canvas, ctx, newCat, {
                                    //   txtColor1, txtColor2
                                    // })
                                    for (let cmd of cmds) {
                                        cmd = cmd[1];
                                        if (cmd !== undefined && cmd.help.enable) {
                                            if (cmd.underCat) {
                                                const field = embed.fields.find(f => f.name.toString().toLowerCase().includes(cmd.underCat.emoji))
                                                if (field) field.value = field.value + '\n' + `\`${cmd.help.name}\` - ${cmd.help.description[language]}`;
                                                else embed.setDescription((embed.description == null ? '' : `${embed.description} \n`) + `\`${cmd.help.name}\` - ${cmd.help.description[language]}`)
                                            } else embed.setDescription((embed.description == null ? '' : `${embed.description} \n`) + `\`${cmd.help.name}\` - ${cmd.help.description[language]}`)
                                        }
                                    }
                                    embed.fields = embed.fields.filter(f => !f.value.endsWith("`"))
                                    row.addComponents(
                                        new MessageButton()
                                        .setCustomId(newCat.position <= 1 ? 'NONE' : 'help-left-cats' + newCat.position)
                                        .setStyle(newCat.position <= 1 ? 'SECONDARY' : 'PRIMARY')
                                        .setEmoji("⬅️")
                                        .setDisabled(newCat.position <= 1 ? true : false),
                                        new MessageButton()
                                        .setCustomId(newCat.position == categories.length ? 'NONE' : 'help-right-cats' + newCat.position)
                                        .setStyle(newCat.position == categories.length ? 'SECONDARY' : 'PRIMARY')
                                        .setEmoji("➡️")
                                        .setDisabled(newCat.position == categories.length ? true : false),
                                    )
                                    if (embed.description.endsWith("```") && embed.fields.length < 1) embed.setDescription(embed.description + `\n\n` + strings.help.noCmd)
                                }
                            }
                        }
                    };
                    row.addComponents(
                        new MessageButton()
                        .setCustomId('delete')
                        .setStyle('DANGER')
                        .setEmoji("🗑️"), )
                } else {
                    if (interaction.customId.startsWith("reset")) {
                        const toReset = interaction.customId.split("-")[1];
                        let setReset = {
                            enable: false,
                            onlyWarn: false,
                            onlyDelete: true,
                            warnAndDelete: false,
                            logsThis: false
                        };
                        settings.automod[toReset] = setReset;
                        await settings.update(settings);
                        row.addComponents(
                            new MessageButton()
                            .setCustomId("NONE")
                            .setDisabled(true)
                            .setStyle("SECONDARY")
                            .setEmoji("🔄")
                        );
                        embed.setDescription(strings.configuration.afterReset)
                            .setTitle(beforeEmbed.title)
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
                            .setFooter(interaction.user.tag, interaction.user.displayAvatarURL({
                                dynamic: true
                            }))
                            .setTimestamp();

                        // switch (toReset) {
                        //     case 'antiInvite': {
                        //         await client.updateGuild(message.guild, {
                        //             "automod.antiInvite": setReset
                        //         })
                        //         break;
                        //     }
                        // }
                    } else {
                        if (interaction.customId.startsWith("daily")) {
                            const arr1 = interaction.customId.split("-");
                            const dailyCd = 8.64e+7;
                            const lastD = userInfo.cd[arr1[1]]
                            const type = arr1[1];
                            const logoEmoji = client.emojis.resolve(client.localEmojis.logo);
                            const d = userInfo.cd.daily;
                            const t = userInfo.cd.treasure;
                            const hasCd1 = ((d !== null && dailyCd - (Date.now() - d) > 0) ? true : false);
                            const hasCd2 = ((t !== null && dailyCd - (Date.now() - t) > 0) ? true : false);
                            row.addComponents(
                                new MessageButton()
                                .setCustomId("daily-home")
                                .setStyle("SUCCESS")
                                .setEmoji("🏠"),
                                new MessageButton()
                                .setCustomId(`daily-daily-${hasCd1 ? 'on' : 'off'}`)
                                .setStyle(hasCd1 ? 'SECONDARY' : 'PRIMARY')
                                .setEmoji("📅"),
                                new MessageButton()
                                .setCustomId(`daily-treasure-${hasCd2 ? 'on' : 'off'}`)
                                .setEmoji("💰")
                                .setStyle(hasCd2 ? "SECONDARY" : "PRIMARY")
                            )
                            console.log(arr1)
                            if (arr1[2] == 'on') {
                                const cdT = dailyCd - (Date.now() - lastD);
                                const cdEmbed = new MessageEmbed()
                                    .setTitle(strings.cooldown)
                                    .setDescription(`⏲️ • ${strings.economy.cd.replace("{time}", (Math.floor(cdT / (1000 * 60 * 60) % 24) + ':' + Math.floor(cdT / (1000 * 60) % 60) + ':' + Math.floor(cdT / (1000) % 24)))}`)
                                    .setFooter(message.author.tag, message.author.avatarURL())
                                    .setTimestamp();

                                return interaction.editReply({
                                    embeds: [cdEmbed],
                                    components: [row]
                                });
                            };
                            switch (type) {
                                case 'home': {
                                    row.components[0]
                                        .setCustomId("NONE")
                                        .setStyle("SECONDARY")
                                        .setDisabled(true)

                                    embed.setTitle(strings.economy.daily.title)
                                        .setDescription(strings.economy.daily.sommaire)
                                        .setFooter(user.tag, user.avatarURL())
                                        .setTimestamp();
                                    break;
                                }
                                case 'daily': {
                                    embed.setTitle(strings.economy.daily.title)
                                        .setTimestamp()
                                        .setFooter(message.author.tag, message.author.avatarURL());
                                    const nbWin = Math.round(Math.random() * 500);
                                    const newB = userInfo.moneyCash + nbWin;
                                    console.log(newB)
                                    let description = `${strings.economy.daily.desc1.replace("{nbWin}", nbWin).replace("{newB}", newB)}`;
                                    //la 
                                    let user = await client.getUser(message.author);
                                    /**
                                     * 
                                     * @param {import('../../../util/functions').UserData} user 
                                     */
                                    async function updateUser(user) {
                                        if (!user) user = await client.createUser({
                                            userID: message.author.id,
                                            avatar: message.author.avatar,
                                            guilds: [],
                                            tag: message.author.tag
                                        })

                                        const currentCredits = user.noctCredits.total;
                                        const date = user.noctCredits.dateToday;
                                        const daily = user.noctCredits.daily;
                                        const currentDate = moment(Date.now()).format("DD/MM/YY")
                                        const newCredits = currentCredits + 10;

                                        if (currentDate !== date) await client.updateUser(message.author, {
                                            "noctCredits.dateToday": currentDate,
                                            "noctCredits.daily.cooldown": false,
                                            "noctCredits.hourly.cooldown": false,
                                            "noctCredits.daily.usedToday": 0,
                                            "noctCredits.hourly.usedToday": 0,
                                        });
                                        const dtFormat = moment(Date.now()).format("HH:mm:SS")
                                        if (daily.usedToday >= daily.limitIfNoVote) {
                                            if (daily.usedToday >= daily.limitIfNoVote && (moment(user.lastVoteTS).format("YY") !== moment(Date.now()).format("YY") || moment(user.lastVoteTS).format("MM") !== moment(Date.now()).format("MM") || moment(user.lastVoteTS).format("DD") !== moment(Date.now()).format("DD"))) return;
                                            else if (daily.usedToday >= daily.maxUsesPerDay) return;
                                        };
                                        if (daily.cooldown) {
                                            if ((daily.usedToday + 1) < daily.maxUsesPerDay) description += `\nYou have 10 ${logoEmoji}credits awaiting you ! To claim it, **use daily command in another server !\n If you don't have ${client.user.username} on another server, you can [add me](${client.botGuild.supportInvite}) !**`, await client.updateUser(message.author, {
                                                "noctCredits.daily.cooldown": false,
                                                "noctCredits.daily.usedToday": (user.noctCredits.daily.usedToday + 1)
                                            });
                                            else description += `\nYou have reached ${logoEmoji}credits limit per day ! \nYou can come back in ${24 - parseInt(dtFormat.slice(0, 2))}h:${60 - parseInt(dtFormat.slice(4, 6))}m:${60 - parseInt(dtFormat.slice(8, 10))}, **use daily command in another server !\n If you don't have ${client.user.username} on another server, you can [add me](${client.botGuild.supportInvite}) !**`;
                                        } else {
                                            if (daily.usedToday < daily.maxUsesPerDay) description += `\n\`\`\`javascript\nYou've got 10 credits, you have now ${newCredits} credits (${2000 - newCredits} left to get ${client.user.username}'s premium) !\`\`\``, await client.updateUser(message.author, {
                                                "noctCredits.total": newCredits,
                                                "noctCredits.daily.cooldown": true,
                                                "noctCredits.daily.usedToday": user.noctCredits.daily.usedToday
                                            });
                                        }
                                    }
                                    embed.setDescription(description);
                                    updateUser(user)
                                    client.updateGuildUI(message.guild, interaction.user, {
                                        "users.$.moneyCash": newB,
                                        "users.$.cd.daily": Date.now()
                                    });
                                    break;
                                }
                                case 'treasure': {
                                    
                                    break;
                                }
                            }
                        }
                    }
                }

                // const file = new MessageAttachment(canvas.toBuffer(), "help.png");
                // if (!IDs.includes(interaction.customId)) return interaction.update({
                //     embeds: [beforeEmbed]
                // })
                if (interaction && !(blackListedIDs.map(b => b.id).includes(interaction.customId))) await interaction.editReply({
                    embeds: [loadingEmbed]
                }).then(async () => {
                    // embed.attachFiles(file);
                    await message.removeAttachments();
                    interaction.editReply({
                        content: replyContent,
                        embeds: [embed],
                        components: message.components.length >= 1 ? [row] : []
                    }).catch(err => {
                        console.log(err);
                        interaction.editReply({
                            embeds: [beforeEmbed]
                        }).catch((err) => {
                            interaction.editReply({
                                embeds: [beforeEmbed]
                            })
                            console.log(err)
                        })
                    });
                })
            } catch (e) {
                console.log(e);
                return interaction.update({
                    embeds: [beforeEmbed]
                }).catch(() => {
                    interaction.editReply({
                        embeds: [beforeEmbed]
                    });
                })
            }
            break;
        }
        case 'PING': {
            console.log(message);
            break;
        }
    }

}