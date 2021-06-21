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
    categorys
} = require('../../../util/constants');
const cats = categorys.slice(0, 25);
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

    const blackListedIDs = [{
        id: 'delete'
    }];
    const IDs = ["NONE", "help-home", "delete", "help-left", "help-right"];
    const embed = new MessageEmbed();
    const row = new MessageActionRow();
    // const loadingEmbed = new MessageEmbed()
    //     .setTitle(strings.help.bCommands)
    //     .setDescription(`${strings.loading}${emojis.loadingEmoji}`)
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
            embeds: [message.embeds[0]]
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
                    .setCustomID(((categorys.length / 25) > 1) ? 'help-right-home1' : 'NONE')
                    .setStyle(((categorys.length / 25) > 1) ? 'PRIMARY' : 'SECONDARY')
                    .setEmoji("➡️")
                    .setDisabled(((categorys.length / 25) > 1) ? false : true),
                )
            } else {
                if (interaction.customID.startsWith("help-right-home")) {
                    const page = parseInt(interaction.customID.slice(interaction.customID.length - 1))
                    const nxtPage = page + 1;
                    if ((categorys.length / 25) == 1 || (categorys.length / 25) == 0 || ((categorys.length / 25) + 1) < nxtPage) return interaction.update({
                        embeds: [message.embeds[0]]
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
                    for (const cat of categorys.slice((25 * (nxtPage - 1)), (25 * (nxtPage)))) {
                        embed.addField(`${await client.emojis.resolve(cat.emoji)} • ${cat.name[language]}`, `\`\`\`md\n# ${cat.description[language]}\`\`\``);
                    }
                    embed.setFooter("Page " + nxtPage);
                    if (nxtPage >= (categorys.length / 25)) row.components[2].setStyle("SECONDARY").setCustomID('NONE').setDisabled(true);
                } else if (interaction.customID.startsWith("help-left-home")) {
                    const page = parseInt(interaction.customID.slice(interaction.customID.length - 1))
                    const nxtPage = page - 1;
                    if ((categorys.length / 25) == 1 || (categorys.length / 25) == 0 || ((categorys.length / 25)) < nxtPage) return interaction.update({
                        embeds: [message.embeds[0]]
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
                    for (const cat of categorys.slice((25 * (nxtPage - 1)), (25 * nxtPage))) {
                        embed.addField(`${await client.emojis.resolve(cat.emoji)} • ${cat.name[language]}`, `\`\`\`md\n# ${cat.description[language]}\`\`\``);
                    }
                    // canvas = await client.drawHelpHome(canvas, ctx, {
                    //     page: nxtPage,
                    //     txtColor1,
                    //     txtColor2
                    // });
                    if (nxtPage == 1) row.components[0].setStyle("SECONDARY").setDisabled(true).setCustomID("NONE"), row.components[1].setStyle("SECONDARY").setDisabled(true).setCustomID("NONE");
                    embed.setFooter("Page " + nxtPage);
                    // if (nxtPage >= (categorys.length / 25)) row.components[2].setStyle("SECONDARY");
                } else {
                    if (interaction.customID.startsWith('help-left-cats')) {

                    } else if (interaction.customID.startsWith('help-left-cats')) {

                    }
                }
            }
        };
        row.addComponents(
            new MessageButton()
            .setCustomID('delete')
            .setStyle('DANGER')
            .setEmoji("🗑️"), )
    }

    // const file = new MessageAttachment(canvas.toBuffer(), "help.png");
    if (!IDs.includes(interaction.customID)) return interaction.update({
        embeds: [message.embeds[0]]
    })
    if (interaction && !(blackListedIDs.map(b => b.id).includes(interaction.customID))) await interaction.update({
        embeds: [loadingEmbed]
    }).then(async () => {
        // embed.attachFiles(file);
        await message.removeAttachments();
        interaction.editReply({
            content: replyContent,
            embeds: [embed],
            components: message.components.length >= 1 ? [row] : []
        }).catch(() => {
            interaction.update({
                embeds: [message.embeds[0]]
            })
        });
    })
}