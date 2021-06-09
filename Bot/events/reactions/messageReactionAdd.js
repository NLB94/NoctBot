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
    const emoji1 = client.emojis.resolve(client.localEmojis.emoji1);
    const emoji2 = client.emojis.resolve(client.localEmojis.emoji2);
    const emoji3 = client.emojis.resolve(client.localEmojis.emoji3);
    const emoji4 = client.emojis.resolve(client.localEmojis.emoji4);
    const emoji5 = client.emojis.resolve(client.localEmojis.emoji5);
    const emoji6 = client.emojis.resolve(client.localEmojis.emoji6);
    const emoji7 = client.emojis.resolve(client.localEmojis.emoji7);
    const emoji8 = client.emojis.resolve(client.localEmojis.emoji8);
    const emoji9 = client.emojis.resolve(client.localEmojis.emoji9);
    const emojiArr = [emoji1.id, emoji2.id, emoji3.id, emoji4.id, emoji5.id, emoji6.id, emoji7.id, emoji8.id];
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
            .setCustomID('help-home-di')
            .setStyle('SECONDARY')
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
                        .setFooter('Page 1 • ' + user.tag, user.displayAvatarURL())
                        .setDescription(user.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)));

                    if (emojiArr.includes(messageReaction.emoji.id)) {
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
                        embed.setDescription(`${embed.description} \n\n${leftCmds.slice(0, 24).map(cmd => `\`${cmd[1].help.name}\` - ${cmd[1].help.description}`).join('\n')}`)
                            .setTitle(embed.title + "\n" + cat.name)
                            .setFooter(embed.footer.text.replace("1", (leftPage) + "/" + leftPage))
                        row.addComponents(
                            new MessageButton()
                            .setCustomID(cat.position == categorys.length ? 'NONE' : 'left-help-cats' + cat.position + '-' + leftPage)
                            .setStyle(cat.position == categorys.length ? 'SECONDARY' : 'PRIMARY')
                            .setEmoji("⬅️"),
                            new MessageButton()
                            .setCustomID(cat.position == categorys.length ? 'NONE' : 'right-help-cats' + cat.position + '-' + leftPage)
                            .setStyle(cat.position == categorys.length ? 'SECONDARY' : 'PRIMARY')
                            .setEmoji("➡️"),
                        )

                    }
                    // const file = new MessageAttachment(canvas.toBuffer(), 'help.png');
                    // await embed.attachFiles(file);
                    row.addComponents(
                        new MessageButton()
                        .setCustomID('delete')
                        .setStyle('DANGER')
                        .setEmoji("🗑️"),
                    )
                    if (message !== undefined) {
                        if (message.guild.me.permissions.has('ADMINISTRATOR')) await messageReaction.users.remove(user.id).catch(() => {});
                        await message.removeAttachments().then(async () => {
                            await message.edit('', {
                                embed, components: [row]
                            })
                        }).catch(ee => {
                            console.log(ee)
                        })
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};