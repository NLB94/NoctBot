"use strict";
const {
    Client
} = require('../../../util/functions');
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
    const settings = await client.getGuild(message.guild);
    const language = settings.general.language;
    const strings = await getStrings(client, language);
    const beforeEmbed = message.embeds[0];
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
    // const txtColor1 = settings.general.apparence == "light" ? "#000000" : "#ffffff";
    // const txtColor2 = settings.general.apparence == "light" ? "darkblue" : "darkblue";
    // let canvas = createCanvas(2000, 2000);
    // let ctx = canvas.getContext("2d");

    // const img = await loadImage(`./Bot/Assets/${settings.general.apparence}.png`);

    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    try {
        const blackListedIDs = [{
            id: 'delete'
        }];
        // const IDs = ["NONE", "help-home", "delete", "help-left", "help-right"];
        const embed = new MessageEmbed();
        const row = new MessageActionRow();
        const loadingEmbed = new MessageEmbed()
            .setTitle(strings.help.bCommands)
            .setDescription(`${strings.loading}${emojis.loadingEmoji}`)
        console.log(interaction.customID);
        if (interaction.customID.startsWith("help")) {
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
                    .setCustomID('help-home')
                    .setStyle('SUCCESS')
                    .setEmoji("🏠"),
                );
            embed.setDescription((embed.description ? embed.description + '\n\n' : '') + `${strings.help.sommaire}`)
            if (interaction.customID == 'NONE') return interaction.update({
                embeds: [beforeEmbed]
            })
            else if (interaction.customID == 'delete') return message.delete();
            else {
                if (interaction.customID == 'help-home') {
                    // canvas = await client.drawHelpHome(canvas, ctx, {
                    //     page: 1,
                    //     txtColor1,
                    //     txtColor2
                    // });
                    for (const cat of cats) {
                        embed.addField(`${await client.emojis.resolve(cat.emoji)} • ${cat.name[language]}`, `\`\`\`md\n# ${cat.description[language]}\`\`\``);
                    }
                    embed.setFooter('Page 1');
                    row.components[0].setDisabled(true).setStyle("SECONDARY").setCustomID('NONE')
                    row.addComponents(
                        new MessageButton()
                        .setDisabled(true)
                        .setCustomID("NONE")
                        .setStyle('SECONDARY')
                        .setEmoji("⬅️"),
                        new MessageButton()
                        .setCustomID(((categories.length / 25) > 1) ? 'help-right-home1' : 'NONE')
                        .setStyle(((categories.length / 25) > 1) ? 'PRIMARY' : 'SECONDARY')
                        .setEmoji("➡️")
                        .setDisabled(((categories.length / 25) > 1) ? false : true),
                    )
                } else {
                    if (interaction.customID.startsWith("help-right-home")) {
                        const page = parseInt(interaction.customID.slice(interaction.customID.length - 1))
                        const nxtPage = page + 1;
                        if ((categories.length / 25) == 1 || (categories.length / 25) == 0 || ((categories.length / 25) + 1) < nxtPage) return interaction.update({
                            embeds: [beforeEmbed]
                        })
                        row.addComponents(
                            new MessageButton()
                            .setCustomID('help-left-home' + nxtPage)
                            .setStyle('PRIMARY')
                            .setEmoji("⬅️"),
                            new MessageButton()
                            .setCustomID('help-right-home' + nxtPage)
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
                        if (nxtPage >= (categories.length / 25)) row.components[2].setStyle("SECONDARY").setCustomID('NONE').setDisabled(true);
                    } else if (interaction.customID.startsWith("help-left-home")) {
                        const page = parseInt(interaction.customID.slice(interaction.customID.length - 1))
                        const nxtPage = page - 1;
                        if ((categories.length / 25) == 1 || (categories.length / 25) == 0 || ((categories.length / 25)) < nxtPage) return interaction.update({
                            embeds: [beforeEmbed]
                        })
                        row.addComponents(
                            new MessageButton()
                            .setCustomID('help-left-home' + nxtPage)
                            .setStyle('PRIMARY')
                            .setEmoji("⬅️"),
                            new MessageButton()
                            .setCustomID('help-right-home' + nxtPage)
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
                        if (nxtPage == 1) row.components[0].setStyle("SECONDARY").setDisabled(true).setCustomID("NONE"), row.components[1].setStyle("SECONDARY").setDisabled(true).setCustomID("NONE");
                        embed.setFooter("Page " + nxtPage);
                        // if (nxtPage >= (categories.length / 25)) row.components[2].setStyle("SECONDARY");
                    } else {
                        if (interaction.customID.startsWith('help-left-cats')) {
                            const pos = interaction.customID.slice('help-left-cats'.length);
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
                                .setCustomID(newCat.position <= 1 ? 'NONE' : 'help-left-cats' + newCat.position)
                                .setStyle(newCat.position <= 1 ? 'SECONDARY' : 'PRIMARY')
                                .setEmoji("⬅️")
                                .setDisabled(newCat.position <= 1 ? true : false),
                                new MessageButton()
                                .setCustomID(newCat.position == categories.length ? 'NONE' : 'help-right-cats' + newCat.position)
                                .setStyle(newCat.position == categories.length ? 'SECONDARY' : 'PRIMARY')
                                .setEmoji("➡️")
                                .setDisabled(newCat.position == categories.length ? true : false),
                            )
                            if (embed.description.endsWith("```") && embed.fields.length < 1) embed.setDescription(embed.description + `\n\n` + strings.help.noCmd)
                        } else if (interaction.customID.startsWith('help-right-cats')) {
                            const pos = interaction.customID.slice('help-right-cats'.length);
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
                                .setCustomID(newCat.position <= 1 ? 'NONE' : 'help-left-cats' + newCat.position)
                                .setStyle(newCat.position <= 1 ? 'SECONDARY' : 'PRIMARY')
                                .setEmoji("⬅️")
                                .setDisabled(newCat.position <= 1 ? true : false),
                                new MessageButton()
                                .setCustomID(newCat.position == categories.length ? 'NONE' : 'help-right-cats' + newCat.position)
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
                .setCustomID('delete')
                .setStyle('DANGER')
                .setEmoji("🗑️"), )
        } else {
            if (interaction.customID.startsWith("reset")) {
                const toReset = interaction.customID.split("-")[1];
                let setReset = {
                    enable: false,
                    onlyWarn: false,
                    onlyDelete: true,
                    warnAndDelete: false,
                    logsThis: false
                };
                console.log(0, settings.automod[toReset])
                settings.automod[toReset] = setReset;
                console.log(1, settings.automod[toReset])
                await settings.save();
                console.log(2, settings.automod[toReset])
                row.addComponents(
                    new MessageButton()
                    .setCustomID("NONE")
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
            }
        }

        // const file = new MessageAttachment(canvas.toBuffer(), "help.png");
        // if (!IDs.includes(interaction.customID)) return interaction.update({
        //     embeds: [beforeEmbed]
        // })
        if (interaction && !(blackListedIDs.map(b => b.id).includes(interaction.customID))) await interaction.update({
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
                interaction.update({
                    embeds: [beforeEmbed]
                }).catch(() => {
                    interaction.editReply({
                        embeds: [beforeEmbed]
                    })
                })
            });
        })
    } catch (e) {
        console.log(e);
        return interaction.update({
            embeds: [beforeEmbed]
        }).catch(() => interaction.editReply({
            embeds: [beforeEmbed]
        }))
    }
}