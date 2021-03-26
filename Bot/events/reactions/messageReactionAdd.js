const {
    MessageEmbed
} = require("discord.js");
const functions = require('./messageReactionAdd');

module.exports = functions.reactionAdd = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const settings = await client.getGuild(message.guild);
    if (settings == undefined) client.createGuild({
        guildID: message.guild.id
    });
    //const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const member = message.guild.members.resolve(user.id);
    const emoji = messageReaction.emoji.name;

    const loadingEmoji = client.emojis.resolve('783028992231866419');
    //emoji number
    const emoji1 = client.emojis.resolve('772418754583855134');
    const emoji2 = client.emojis.resolve('770976748082298891');
    const emoji3 = client.emojis.resolve('772419302133334046');
    const emoji4 = client.emojis.resolve('772418814594777099');
    const emoji5 = client.emojis.resolve('772419197673930782');
    const emoji6 = client.emojis.resolve('772419404855902209');
    const emoji7 = client.emojis.resolve('770976765219831811');
    const emoji8 = client.emojis.resolve('772418662929924106');
    
    const check_mark = client.emojis.resolve('770980790242377739');
    const x_mark = client.emojis.resolve('806440609127596032');
    const arrowRight = client.emojis.resolve('770976808899444776');

    const tada = client.emojis.resolve('770980801411678229');
    const announcEmoji = client.emojis.resolve('806438435933913178');
    const eyesEmoji = client.emojis.resolve('806438464064978944');
    const alertEmoji = client.emojis.resolve('806438454082797588');


    if (member.user.bot) return;
    if (messageReaction.partial) {
        await messageReaction.fetch();
        return;
    }


    if (message.author.id === '735824367698837555') {
        try {
            if (message.guild.id == '727494941911154688') {
                if (message.id == '823203954833227806') {
                    const givRole = message.guild.roles.resolve('822213564752330792');
                    const announRole = message.guild.roles.resolve('822500136176451684');
                    const updateRole = message.guild.roles.resolve('822500107973820466');
                    const spoilRole = message.guild.roles.resolve('822500061736337428');

                    switch (messageReaction.emoji) {
                        case tada: {
                            member.roles.add(givRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${givRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                        case announcEmoji: {
                            member.roles.add(announRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${announRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                        case alertEmoji: {
                            member.roles.add(updateRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${updateRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                        case eyesEmoji: {
                            member.roles.add(spoilRole.id).then(() => {
                                member.send({
                                    embed: {
                                        title: 'Role Added',
                                        description: `${check_mark}You have successfully got **${spoilRole.name}** role by reacting in **_${message.guild.name}_** !`
                                    }
                                })
                            }).catch(() => {})
                            break;
                        }
                    }
                    return;
                }
            }
            if (messageReaction.emoji == tada) {
                if (!message.embeds[0].author.name.startsWith('🎉🎉Givea')) return;
                if (message.embeds[0].author.name.includes('🎉🎉Giveaway🎉🎉')) {
                    const giveaway = await client.getGiveaway(message.guild, message.id);
                    const embed = new MessageEmbed()
                        .setDescription(`${tada}Giveaway entry accepted for \`${message.embeds[0].title}\`${tada}`)
                        .setAuthor(user.username, user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
                        .setTitle('Giveaway Entry')
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#FFFFFF')
                        .setURL('https://discord.gg/unRX2SUcvw');
                    try {
                        user.send(embed)
                    } catch (e) {
                        console.log(e);
                    }
                } else if (message.embeds[0].author.name.includes('Giveaway ended')) {
                    const embed = new MessageEmbed()
                        .setDescription(`${x_mark}Giveaway entry denied because the giveaway ended${x_mark}`)
                        .setAuthor(user.username, user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
                        .setTitle('Giveaway Entry')
                        .setFooter(message.guild.name, message.guild.iconURL())
                        .setTimestamp()
                        .setColor('#FFFFFF')
                        .setURL('https://discord.gg/unRX2SUcvw');
                    try {
                        user.send(embed)
                    } catch (e) {
                        console.log(e);
                    }
                }

            }
            if (message.content !== '') {
                if (emoji == '❌' && (message.content.includes('React to get a category') || message.content.includes('Click ↩️ for return to home')) && message.content.startsWith(user.tag)) {
                    if (message !== undefined) message.delete();
                }
                if (message.content.includes('React to get a category') && emoji !== '❌' && message.content.startsWith(user.tag)) {
                    const embed = new MessageEmbed()
                        .setColor("#000000")
                        .setAuthor("I2Z7", client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
                        .setURL('https://discord.gg/92ffufA')
                        .setTimestamp()
                        .setFooter(`Requested by ${user.tag}`)
                        .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! `);


                    switch (messageReaction.emoji) {
                        case emoji1: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'serversettings').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Server Settings");
                            break;
                        }
                        case emoji2: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'moderation').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Moderation");
                            break;
                        }
                        case emoji3: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'level').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Level");
                            break;
                        }
                        case emoji4: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'info').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Info");
                            break;
                        }
                        case emoji5: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'economy').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Economy");
                            break;
                        }
                        case emoji6: {
                            embed.setDescription(`Soon...`);
                            embed.setTitle("Giveaway");
                            break;
                        }
                        case emoji7: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'other').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Other");
                            break;
                        }
                    }
                    if (message !== undefined) {
                        if (message.guild.me.permissions.has('ADMINISTRATOR')) await message.reactions.removeAll();
                        else await message.reactions.cache.forEach(r => r.users.remove(client.user.id))

                        await message.edit(`${user.tag}, Click ↩️ for return to home!`, embed).then(async msg => {
                            await msg.react('↩️');
                            await msg.react('❌');
                        })
                    }
                }

                if (emoji === "↩️" && message.content.includes('Click ↩️ for return to home') && message.content.startsWith(user.tag)) {
                    if (message !== undefined) {
                        if (message.guild.me.permissions.has('ADMINISTRATOR')) await message.reactions.removeAll();
                        else await message.reactions.cache.forEach(r => r.users.remove(client.user.id))
                        const embed = new MessageEmbed()
                            .setColor("#000000")
                            .setAuthor("I2Z7", client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
                            .setTitle("Bot Commands")
                            .setURL('https://discord.gg/92ffufA')
                            .setDescription(`Loading commands${loadingEmoji}`)
                            .setTimestamp()
                            .setFooter(message.guild.name);
                        const embed2 = new MessageEmbed()
                            .setColor("#000000")
                            .setAuthor("I2Z7", client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
                            .setTitle("Bot Commands")
                            .setURL('https://discord.gg/92ffufA')
                            .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>!`)
                            .setTimestamp()
                            .setFooter(`React with ❌ to cancel command | Requested by ${user.tag}`)



                        embed2.addFields({
                            name: `${emoji1} Server settings :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji2} Moderation :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji3} Level :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji4} Info :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji5} Economy :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji6} Giveaway :`,
                            value: `Soon...`
                        }, {
                            name: `${emoji7} Other :`,
                            value: `\u200b`
                        }, );

                        await message.edit(embed).then(async message => {
                            await message.reactions.removeAll();
                            await message.react('772418754583855134').catch(() => '');
                            await message.react('770976748082298891').catch(() => '');
                            await message.react('772419302133334046').catch(() => '');
                            await message.react('772418814594777099').catch(() => '');
                            await message.react('772419197673930782').catch(() => '');
                            await message.react('772419404855902209').catch(() => '');
                            await message.react('770976765219831811').catch(() => '');
                            await message.react('❌').catch(() => '')
                        }).then(setTimeout(() => {
                            message.edit(`${user.tag}, React to get a category's commands`, embed2)
                        }, '9000'))
                    }; //pour la commande help jusqu'à ici
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};