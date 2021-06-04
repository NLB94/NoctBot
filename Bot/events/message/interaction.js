"use strict";
const {
    Client
} = require('../../../util/functions');
const {
    Interaction,
    MessageComponentInteraction,
    MessageEmbed,
    MessageAttachment
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
    let canvas = createCanvas(2000, 2000);
    let ctx = canvas.getContext("2d");

    const img = await loadImage("./Bot/Assets/blanc.png");

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const blackListedIDs = [{
        id: 'delete'
    }]
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
    switch (interaction.customID) {
        case "delete": {
            message.delete();
            break;
        }
        case 'help-home': {
            let isHome = false;
            const catName = message.embeds[0].title.slice(strings.help.bCommands.length + "\n".length);
            if (catName.length == 0) isHome = true;
            if (isHome) return interaction.update({
                embeds: [message.embeds[0]]
            });
            canvas = await client.drawHelpHome(canvas, ctx, {
                page: 1
            });
            embed.setFooter('Page 1');
            break;
        }
        case 'right-help': {
            let isHome = false;
            let isLast = false;
            const catName = message.embeds[0].title.slice(strings.help.bCommands.length + "\n".length);
            if (catName.length == 0) isHome = true;
            if (catName && categorys.map(c => c.name).indexOf(catName) == categorys.length - 1) isLast = true;
            if (isHome) {
                const pageNb = parseInt(message.embeds[0].footer.text?.slice(5, 6));
                const nxtPage = pageNb + 1;
                if ((categorys.length / 8) == 1 || (categorys.length / 8) == 0 || ((categorys.length / 8) + 1) < nxtPage) return interaction.update({
                    embeds: [message.embeds[0]]
                })
                canvas = await client.drawHelpHome(canvas, ctx, {
                    page: nxtPage
                });
                embed.setFooter("Page " + nxtPage);

            } else if (isLast) {
                for (const category of categorys) {
                    embed.addField(`${category.emoji}${category.name}`, '\u200b')
                }
            } else {
                const exCat = categorys.find(c => c.name == catName);
                const newCat = categorys[exCat.position + 1]
                embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === newCat.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                embed.setTitle(embed.title + "\n" + newCat.name);
            }
            break;
        }
        case 'left-help': {
            let isHome = false;
            let isLast = false;
            const catName = message.embeds[0].title.slice(strings.help.bCommands.length + "\n".length);
            if (catName.length == 0) isHome = true;
            if (catName && categorys.find(c => c.name == catName).position < 1) isLast = true;
            if (isHome) {
                const pageNb = parseInt(message.embeds[0].footer.text?.slice(5, 6));
                const nxtPage = pageNb - 1;
                if ((categorys.length / 8) == 1 || (categorys.length / 8) == 0 || nxtPage == 0) return interaction.update({
                    embeds: [message.embeds[0]]
                })
                canvas = await client.drawHelpHome(canvas, ctx, {
                    page: nxtPage
                });
                embed.setFooter("Page " + nxtPage);

            } else if (isLast) {
                for (const category of categorys) {
                    embed.addField(`${category.emoji}${category.name}`, '\u200b')
                }
            } else {
                const exCat = categorys.find(c => c.name == catName);
                const newCat = categorys[exCat.position - 1]
                embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === newCat.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                embed.setTitle(embed.title + "\n" + newCat.name);
            }
            break;
        }
    }
    const file = new MessageAttachment(canvas.toBuffer(), "help.png");
    if (interaction && !(blackListedIDs.map(b => b.id).includes(interaction.customID))) await interaction.update({
        embeds: [loadingEmbed]
    }).then(async () => {
        embed.attachFiles(file);
        await message.removeAttachments();
        interaction.editReply({
            embeds: [embed]
        })
    })
}