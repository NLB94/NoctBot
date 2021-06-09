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
    const txtColor1 = settings.general.apparence == "light" ? "#000000" : "#ffffff";
    const txtColor2 = settings.general.apparence == "light" ? "darkblue" : "darkblue";
    let canvas = createCanvas(2000, 2000);
    let ctx = canvas.getContext("2d");

    const img = await loadImage(`./Bot/Assets/${settings.general.apparence}.png`);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blackListedIDs = [{
        id: 'delete'
    }];
    const IDs = [
        'help-home', 'NONE', 'delete', 'right-help-home1', 'left-help-home2'
    ];
    const loadingEmbed = new MessageEmbed()
        .setTitle(strings.help.bCommands)
        .setDescription(`${strings.loading}${emojis.loadingEmoji}`)
    const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setURL(`${client.botGuild.supportInvite}`)
        .setTimestamp()
        .setTitle(strings.help.bCommands)
        .setDescription(user.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)));

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomID('help-home')
            .setStyle('SUCCESS')
            .setEmoji("🏠"),
        );
    embed.setDescription((embed.description ? embed.description + '\n\n' : '') + `${strings.help.sommaire}`)
    console.log(interaction.customID);
    if (interaction.customID == 'NONE') return interaction.update({
        embeds: [message.embeds[0]]
    })
    else if (interaction.customID == 'delete') return message.delete();
    else {
        if (interaction.customID == 'help-home') {
            canvas = await client.drawHelpHome(canvas, ctx, {
                page: 1,
                txtColor1,
                txtColor2
            });
            embed.setFooter('Page 1');
            row.components[0].setDisabled(true).setStyle("SECONDARY").setCustomID('NONE')
            row.addComponents(
                new MessageButton()
                .setDisabled(true)
                .setCustomID("NONE")
                .setStyle('SECONDARY')
                .setEmoji("⬅️"),
                new MessageButton()
                .setCustomID(((categorys.length / 8) > 1) ? 'right-help-home1' : 'NONE')
                .setStyle(((categorys.length / 8) > 1) ? 'PRIMARY' : 'SECONDARY')
                .setEmoji("➡️"),
            )
        } else {
            if (interaction.customID.startsWith("right-help-home")) {
                const page = parseInt(interaction.customID.slice(interaction.customID.length - 1))
                const nxtPage = page + 1;
                if ((categorys.length / 8) == 1 || (categorys.length / 8) == 0 || ((categorys.length / 8) + 1) < nxtPage) return interaction.update({
                    embeds: [message.embeds[0]]
                })
                row.addComponents(
                    new MessageButton()
                    .setCustomID('left-help-home' + nxtPage)
                    .setStyle('PRIMARY')
                    .setEmoji("⬅️"),
                    new MessageButton()
                    .setCustomID('right-help-home' + nxtPage)
                    .setStyle('PRIMARY')
                    .setEmoji("➡️"),
                )
                canvas = await client.drawHelpHome(canvas, ctx, {
                    page: nxtPage,
                    txtColor1,
                    txtColor2
                });
                embed.setFooter("Page " + nxtPage);
                if (nxtPage >= (categorys.length / 8)) row.components[2].setStyle("SECONDARY").setCustomID('NONE').setDisabled(true);
            } else if (interaction.customID.startsWith("left-help-home")) {
                const page = parseInt(interaction.customID.slice(interaction.customID.length - 1))
                const nxtPage = page - 1;
                if ((categorys.length / 8) == 1 || (categorys.length / 8) == 0 || ((categorys.length / 8)) < nxtPage) return interaction.update({
                    embeds: [message.embeds[0]]
                })
                row.addComponents(
                    new MessageButton()
                    .setCustomID('left-help-home' + nxtPage)
                    .setStyle('PRIMARY')
                    .setEmoji("⬅️"),
                    new MessageButton()
                    .setCustomID('right-help-home' + nxtPage)
                    .setStyle("PRIMARY")
                    .setEmoji("➡️"),
                )
                canvas = await client.drawHelpHome(canvas, ctx, {
                    page: nxtPage,
                    txtColor1,
                    txtColor2
                });
                console.log()
                if (nxtPage == 1) row.components[0].setStyle("SECONDARY").setDisabled(true).setCustomID("NONE"), row.components[1].setStyle("SECONDARY").setDisabled(true).setCustomID("NONE");
                embed.setFooter("Page " + nxtPage);
                // if (nxtPage >= (categorys.length / 8)) row.components[2].setStyle("SECONDARY");
            }
        }
    };
    row.addComponents(
        new MessageButton()
        .setCustomID('delete')
        .setStyle('DANGER')
        .setEmoji("🗑️"), )
    const file = new MessageAttachment(canvas.toBuffer(), "help.png");
    if (!IDs.includes(interaction.customID)) return interaction.update({
        embeds: [message.embeds[0]]
    })
    if (interaction && !(blackListedIDs.map(b => b.id).includes(interaction.customID))) await interaction.update({
        embeds: [loadingEmbed]
    }).then(async () => {
        embed.attachFiles(file);
        await message.removeAttachments();
        interaction.editReply({
            content: replyContent,
            embeds: [embed],
            components: message.components.length >= 1 ? [row] : []
        });
    }).catch(err => console.log(err));
}