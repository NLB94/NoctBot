const {
    createCanvas,
    loadImage
} = require('canvas');
const {
    MessageEmbed,
    MessageAttachment,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
    getStrings,
    categorys
} = require('../../../util/constants');
const functions = require('./messageReactionAdd');

module.exports = functions.reactionAdd = async (client, messageReaction, user) => {
    const message = messageReaction.message;

    const settings = await client.getGuild(message.guild)

    if (settings == undefined) settings = await client.createGuild({
        guildID: message.guild.id
    });
    let canvas = createCanvas(2000, 2000);
    let ctx = canvas.getContext("2d");

    const img = await loadImage(`./Bot/Assets/${settings.general.apparence}.png`)
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

    for (const cat of categorys) {
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

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (member.user.bot) return;
    if (messageReaction.partial) {
        await messageReaction.fetch();
        if (message.partial) {
            await message.fetch()
        }
        return;
    }

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomID('help-home')
            .setStyle('SUCCESS')
            .setEmoji("🏠"),
        );

    if (message.author.id == client.user.id) {
        try {
            if (message.guild.id == '727494941911154688') {
                require("./reactionAdd/supportGuild")(client, messageReaction, user);
            };
            if (message.embeds[0].description.startsWith("```What do you want") || message.embeds[0].description.startsWith("```Que voulez-vous")) {
                require("./reactionAdd/configuration")(client, messageReaction, user);
            }


            if (messageReaction.emoji == tada && !message.embeds[0].title.startsWith(strings.help.bCommands)) {
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
                    const embed = await new MessageEmbed()
                        .setColor("#000000")
                        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                        .setURL(`${client.botGuild.supportInvite}`)
                        .setTimestamp()
                        .setTitle(strings.help.bCommands)
                        .setFooter('Page 1 • ' + user.tag, user.displayAvatarURL())
                        .setDescription(user.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)));

                    if (emojiArr.includes(messageReaction.emoji)) {
                        const cat = categorys.find(e => e.emoji == messageReaction.emoji.id)
                        // canvas = await client.drawHelpCats(canvas, ctx, cat, {
                        //     txtColor1, txtColor2
                        // })
                        const cmds = await client.commands.filter(cmd => cmd.help.category === cat.commandsCat);
                        const leftCmds = [];
                        let leftPage = 0;
                        for (const cmd of cmds) {
                            leftCmds.push(cmd);
                        }
                        leftPage = Math.round((leftCmds.length / 25) + 0.50)
                        embed.setTitle(embed.title + "\n" + cat.name[language])
                            .setFooter(embed.footer.text.replace("1", (leftPage) + "/" + leftPage))
                            .setDescription((embed.description ? embed.description + '\n\n' : '') + `${strings.help.sommaire}`)
                        for (const underCat of cat.underCat) {
                            const emj = client.emojis.resolve(underCat.emoji);
                            const strs = underCat.description[settings.general.language];
                            embed.addField(`${emj} • ${underCat.name[settings.general.language]}`, `\`\`\`yaml\n${strs}\`\`\``)
                        }
                        // canvas = await client.drawHelpCats(canvas, ctx, cat, {
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
                            .setCustomID(cat.position <= 1 ? 'NONE' : 'help-left-cats' + cat.position + '-' + leftPage)
                            .setStyle(cat.position <= 1 ? 'SECONDARY' : 'PRIMARY')
                            .setEmoji("⬅️")
                            .setDisabled(cat.position <= 1 ? true : false),
                            new MessageButton()
                            .setCustomID(cat.position == categorys.length ? 'NONE' : 'help-right-cats' + cat.position + '-' + leftPage)
                            .setStyle(cat.position == categorys.length ? 'SECONDARY' : 'PRIMARY')
                            .setEmoji("➡️")
                            .setDisabled(cat.position == categorys.length ? true : false),
                        )
                        row.addComponents(
                            new MessageButton()
                            .setCustomID('delete')
                            .setStyle('DANGER')
                            .setEmoji("🗑️"),
                        )
                        if (embed.description.endsWith("```") && embed.fields.length < 1) embed.setDescription(embed.description + `\n\n` + strings.help.noCmd)
                        if (message !== undefined) {
                            if (message.guild.me.permissions.has('ADMINISTRATOR')) await messageReaction.users.remove(user.id).catch(() => {});
                            await message.edit('\u200b', {
                                embed,
                                components: [row]
                            }).catch(ee => {
                                console.log(ee)
                            })
                        }
                    }
                    // const file = new MessageAttachment(canvas.toBuffer(), 'help.png');
                    // await embed.attachFiles(file);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};