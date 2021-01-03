const { MessageReaction, MessageEmbed } = require("discord.js");

module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const settings = await client.getGuild(message.guild);
    const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name;
    const reactRole = message.guild.roles.cache.get('770658615752261682');
    const rChannel = client.channels.cache.get('776823872544309259');

    const loadingEmoji = client.emojis.resolve('783028992231866419');
    const emoji1 = client.emojis.resolve('772418754583855134');
    const emoji2 = client.emojis.resolve('770976748082298891');
    const emoji3 = client.emojis.resolve('772419302133334046');
    const emoji4 = client.emojis.resolve('772418814594777099');
    const emoji5 = client.emojis.resolve('772419197673930782');
    const emoji6 = client.emojis.resolve('772419404855902209');
    const emoji7 = client.emojis.resolve('770976765219831811');
    const emoji8 = client.emojis.resolve('772418662929924106');

    if (member.user.bot) return;
    if (messageReaction.partial) {
        await messageReaction.fetch();
        return;
    }

    if (["check_mark_nitro"].includes(emoji) && message.channel.id === rChannel.id) {
        switch (emoji) {
            case "check_mark_nitro":
                member.roles.remove(reactRole);
                member.send(`You have been successfully verified in ${message.guild.name}!`)
                break;
        };
    };


    if (message.author.id === '735824367698837555' && message.content !== '') {
        try {
            //pour la commande help jusqu'aux prochains commentaires
            if (emoji === "❌" && (message.content.startsWith('React to get category') || message.content.startsWith('Click ↩️ for return to home'))) message.delete();
            if (messageReaction.emoji === emoji1 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {
                //server settings
                const embed1 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Server Settings")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! \n\n${client.commands.filter(cat => cat.help.category === 'serversettings').map(cmd => `${settings.general.prefix}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`)
                    .setTimestamp()
                    .setFooter(message.guild.name)
                msg.edit(['Click ↩️ for return to home!'], embed1).then(async msg => {
                    await msg.react('↩️');
                    await msg.react('❌');
                });
            });
            if (messageReaction.emoji === emoji2 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {
                //moderation
                const embed2 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Moderation")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! \n\n${client.commands.filter(cat => cat.help.category === 'moderation').map(cmd => `${settings.general.prefix}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`)
                    .setTimestamp()
                    .setFooter(message.guild.name)
                msg.edit(['Click ↩️ for return to home!'], embed2).then(async msg => {
                    await msg.react('↩️');
                    await msg.react('❌');
                });
            });
            if (messageReaction.emoji === emoji3 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {
                //Level
                const embed3 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Level")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! \n\n${client.commands.filter(cat => cat.help.category === 'level').map(cmd => `${settings.general.prefix}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`)
                    .setTimestamp()
                    .setFooter(message.guild.name)
                msg.edit(['Click ↩️ for return to home!'], embed3).then(async msg => {
                    await msg.react('↩️');
                    await msg.react('❌');
                });
            });
            if (messageReaction.emoji === emoji4 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {
                //Info
                const embed4 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Info")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! \n\n${client.commands.filter(cat => cat.help.category === 'info').map(cmd => `${settings.general.prefix}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`)
                    .setTimestamp()
                    .setFooter(message.guild.name)
                msg.edit(['Click ↩️ for return to home!'], embed4).then(async msg => {
                    await msg.react('↩️');
                    await msg.react('❌');
                });
            });
            if (messageReaction.emoji === emoji5 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {
                //Economy
                const embed5 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Economy")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! \n\n${client.commands.filter(cat => cat.help.category === 'economy').map(cmd => `${settings.general.prefix}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`)
                    .setTimestamp()
                    .setFooter(message.guild.name)
                msg.edit(['Click ↩️ for return to home!'], embed5).then(async msg => {
                    await msg.react('↩️');
                    await msg.react('❌');
                });
            });
            if (messageReaction.emoji === emoji6 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {
                //giveaway
                const embed6 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Giveaway")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`Soon...`)
                    .setTimestamp()
                    .setFooter(message.guild.name)
                msg.edit(['Click ↩️ for return to home!'], embed6).then(async msg => {
                    await msg.react('↩️');
                    await msg.react('❌');
                });
            });
            if (messageReaction.emoji === emoji7 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {
                //other
                const embed8 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Other")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! \n\n${client.commands.filter(cat => cat.help.category === 'other').map(cmd => `${settings.general.prefix}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`)
                    .setTimestamp()
                    .setFooter(message.guild.name)
                msg.edit(['Click ↩️ for return to home!'], embed8).then(async msg => {
                    await msg.react('↩️');
                    await msg.react('❌');
                });
            });
            // if (messageReaction.emoji === emoji8 && message.content.startsWith('React to get category')) message.reactions.removeAll().then(msg => {

            //     });
            if (emoji === "↩️" && message.content.startsWith('Click ↩️ for return to home')) message.reactions.removeAll().then(msg => {
                const embed = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Bot Commands")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`Loading commands${loadingEmoji}`)
                    .setTimestamp()
                    .setFooter(message.guild.name);
                const embed2 = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
                    .setTitle("Bot Commands")
                    .setURL('https://discord.gg/92ffufA')
                    .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>!`)
                    .setTimestamp()
                    .setFooter('React with ❌ to cancel command')



                embed2.addFields(
                    { name: `${emoji1} Server settings :`, value: `\u200b` },
                    { name: `${emoji2} Moderation :`, value: `\u200b` },
                    { name: `${emoji3} Level :`, value: `\u200b` },
                    { name: `${emoji4} Info :`, value: `\u200b` },
                    { name: `${emoji5} Economy :`, value: `\u200b` },
                    { name: `${emoji6} Giveaway :`, value: `\u200b` },
                    { name: `${emoji7} Other :`, value: `\u200b` },
                );

                msg.edit([''], embed).then(async msg => {
                    await msg.reactions.removeAll();
                    await msg.react('772418754583855134').catch(() => '');
                    await msg.react('770976748082298891').catch(() => '');
                    await msg.react('772419302133334046').catch(() => '');
                    await msg.react('772418814594777099').catch(() => '');
                    await msg.react('772419197673930782').catch(() => '');
                    await msg.react('772419404855902209').catch(() => '');
                    await msg.react('770976765219831811').catch(() => '');
                    await msg.react('❌').catch(() => '')
                }
                ).then(setTimeout(() => {
                    msg.edit(['React to get category\'s commands'], embed2)
                }, '9000'))
            }); //pour la commande help jusqu'à ici
        }
        catch (e) {
            console.log(e);
            message.channel.send('Have an error ! Check if I have the permission `MANAGE_MESSAGES`!')
        }
    }
};