"use strict";
const {
    Interaction,
    Client,
    MessageComponentInteraction,
    MessageEmbed
} = require('discord.js')
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
    const strings = language == 'en' ? client.en : (language == 'fr' ? client.fr : client.es);

    const emoji1 = client.emojis.resolve(client.localEmojis.emoji1);
    const emoji2 = client.emojis.resolve(client.localEmojis.emoji2);
    const emoji3 = client.emojis.resolve(client.localEmojis.emoji3);
    const emoji4 = client.emojis.resolve(client.localEmojis.emoji4);
    const emoji5 = client.emojis.resolve(client.localEmojis.emoji5);
    const emoji6 = client.emojis.resolve(client.localEmojis.emoji6);
    const emoji7 = client.emojis.resolve(client.localEmojis.emoji7);
    const emoji8 = client.emojis.resolve(client.localEmojis.emoji8);
    const emoji9 = client.emojis.resolve(client.localEmojis.emoji9);
    
    const blackListedIDs = [{
        id: 'delete'
    }]
    const categorys = [{
        name: 'Configuration',
        emoji: emoji1,
        commandsCat: 'configuration',
        position: 0
    }, {
        name: 'Moderation',
        emoji: emoji2,
        commandsCat: 'moderation',
        position: 1
    }, {
        name: 'Level',
        emoji: emoji3,
        commandsCat: 'level',
        position: 2
    }, {
        name: 'Info',
        emoji: emoji4,
        commandsCat: 'info',
        position: 3
    }, {
        name: 'Economy',
        emoji: emoji5,
        commandsCat: 'economy',
        position: 4
    }, {
        name: 'Giveaway',
        emoji: emoji6,
        commandsCat: 'giveaway',
        position: 5
    }, {
        name: 'Other',
        emoji: emoji7,
        commandsCat: 'other',
        position: 6
    }, {
        name: 'Counts',
        emoji: emoji8,
        commandsCat: 'counts',
        position: 7
    }, ];
    const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setURL(`${client.botGuild.supportInvite}`)
        .setTimestamp()
        .setTitle(strings.help.bCommands)
        .setFooter(user.tag)
        .setDescription(user.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)));
    switch (interaction.customID) {
        case "delete": {
            message.delete();
            break;
        }
        case 'help-home': {
            for (const category of categorys) {
                embed.addField(`${category.emoji}${category.name}`, '\u200b')
            }
            break;
        }
        case 'right-help': {
            let isHome = false;
            let isLast = false;
            const catName = message.embeds[0].title.slice(strings.help.bCommands.length + "\n".length);
            if (catName.length == 0) isHome = true;
            if (catName && categorys.map(c => c.name).indexOf(catName) == categorys.length - 1) isLast = true;
            if (isHome) {
                const category = categorys[0];
                embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                embed.setTitle(embed.title + "\n" + category.name);
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
                const category = categorys[categorys.length - 1];
                embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                embed.setTitle(embed.title + "\n" + category.name);
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
    if (interaction !== undefined && !(blackListedIDs.map(b => b.id).includes(interaction.customID))) await interaction.update({
        embeds: [embed]
    })
}