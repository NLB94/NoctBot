const {
    MessageEmbed
} = require('discord.js');
const { getStrings, categorys } = require('../../../util/constants');
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

    const strings = await getStrings(client, language);
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
                require("./reactionAdd/supportGuild")(client, messageReaction, user);
            };
            if (message.embeds[0].description.startsWith("```What do you want") || message.embeds[0].description.startsWith("```Que voulez-vous")) {
                require("./reactionAdd/configuration")(client, messageReaction, user);
            }


            if (messageReaction.emoji == tada) {
                if (!message.embeds[0].author.name.startsWith('🎉🎉Givea')) return;
                if (message.embeds[0].author.name.includes('🎉🎉Giveaway🎉🎉')) {
                    const giveaway = await client.getGiveaway(message.guild, message.id);
                    const embed = new MessageEmbed()
                        .setDescription(`${tada}${strings.reactAdd.giveaway.entryAccept.replace("{price}", message.embeds[0].title)}${tada}`)
                        .setAuthor(user.username, user.avatarURL(), `${client.botGuild.inviteLink}`)
                        .setTitle(strings.giveaway.givEntry)
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
            if (message.embeds[0]) {
                if (message.embeds[0].title.startsWith(strings.help.bCommands) && message.embeds[0].description.startsWith(user.tag)) {
                    const embed = new MessageEmbed()
                        .setColor("#000000")
                        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                        .setURL(`${client.botGuild.supportInvite}`)
                        .setTimestamp()
                        .setTitle(strings.help.bCommands)
                        .setFooter(message.embeds[0].footer.text || user.tag)
                        .setDescription(user.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)));


                    switch (messageReaction.emoji) {
                        case emoji1: {
                            const category = categorys.find(c => c.emoji == emoji1);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                        case emoji2: {
                            const category = categorys.find(c => c.emoji == emoji2);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                        case emoji3: {
                            const category = categorys.find(c => c.emoji == emoji3);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                        case emoji4: {
                            const category = categorys.find(c => c.emoji == emoji4);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                        case emoji5: {
                            const category = categorys.find(c => c.emoji == emoji5);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                        case emoji6: {
                            const category = categorys.find(c => c.emoji == emoji6);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                        case emoji7: {
                            const category = categorys.find(c => c.emoji == emoji7);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                        case emoji8: {
                            const category = categorys.find(c => c.emoji == emoji8);
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cmd => cmd.help.category === category.commandsCat).map(cmd => `\`${cmd.help.name}\` - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle(embed.title + "\n" + category.name);
                            break;
                        }
                    }
                    if (message !== undefined) {
                        if (message.guild.me.permissions.has('ADMINISTRATOR')) await messageReaction.users.remove(user.id).catch(() => {});
                        await message.edit(embed).catch(() => {})
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};