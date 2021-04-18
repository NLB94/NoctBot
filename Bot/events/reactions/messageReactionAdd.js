const {
    MessageEmbed
} = require('discord.js');
const functions = require('./messageReactionAdd');

module.exports = functions.reactionAdd = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const settings = await client.getGuild(message.guild)
    
    if (settings == undefined) client.createGuild({
        guildID: message.guild.id
    });
    //const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const member = message.guild.members.resolve(user.id);
    const emoji = messageReaction.emoji.name;

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
                const verifyRole = message.guild.roles.resolve('770658615752261682');
                if (message.id == '823174979608248381') {
                    member.roles.remove(verifyRole.id).then(() => {
                        member.send({
                            embed: {
                                title: 'Verification',
                                description: `${check_mark}You have been verified by accepting the rules in **_${message.guild.name}_**`
                            }
                        })
                    }).catch(err => console.log(err))
                }
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
                        .setAuthor(user.username, user.avatarURL(), `${client.botGuild.inviteLink}`)
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
                };
            }
            if (message.content !== '') {
                if (emoji == '❌' && (message.content.includes('React to get a category') || message.content.includes('Click ↩️ for return to home')) && message.content.startsWith(user.tag)) {
                    if (message !== undefined) message.delete().catch(err => {})
                }
                if (message.content.includes('React to get a category') && emoji !== '❌' && message.content.startsWith(user.tag)) {
                    const embed = new MessageEmbed()
                        .setColor("#000000")
                        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                        .setURL(`${client.botGuild.supportInvite}`)
                        .setTimestamp()
                        .setFooter(`Requested by ${user.tag}`)
                        .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>! `);


                    switch (messageReaction.emoji) {
                        case emoji1: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'configuration').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
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
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'giveaway').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Giveaway");
                            break;
                        }
                        case emoji7: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'other').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Other");
                            break;
                        }
                        case emoji8: {
                            embed.setDescription(`${embed.description} \n\n${client.commands.filter(cat => cat.help.category === 'counts').map(cmd => `${arrowRight}${cmd.help.name} - ${cmd.help.description}`).join('\n')}`);
                            embed.setTitle("Count channels");
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
                            .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                            .setTitle("Bot Commands")
                            .setURL(`${client.botGuild.supportInvite}`)
                            .setDescription(`Loading commands${loadingEmoji}`)
                            .setTimestamp()
                            .setFooter(message.guild.name);
                        const embed2 = new MessageEmbed()
                            .setColor("#000000")
                            .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
                            .setTitle("Bot Commands")
                            .setURL(`${client.botGuild.supportInvite}`)
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
                            value: `\u200b`
                        }, {
                            name: `${emoji7} Other :`,
                            value: `\u200b`
                        }, {
                            name: `${emoji8} Count :`,
                            value: `\u200b`
                        });

                        await message.edit(embed).then(async message => {
                            await message.reactions.removeAll();
                            await message.react(emoji1).catch(() => {});
                            await message.react(emoji2).catch(() => {});
                            await message.react(emoji3).catch(() => {});
                            await message.react(emoji4).catch(() => {});
                            await message.react(emoji5).catch(() => {});
                            await message.react(emoji6).catch(() => {});
                            await message.react(emoji7).catch(() => {});
                            await message.react(emoji8).catch(() => {})
                            await message.react('❌').catch(() => {})
                        }).then(setTimeout(() => {
                            message.edit(`${user.tag}, React to get a category's commands`, embed2)
                        }, 10000))
                    }; //pour la commande help jusqu'à ici
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
};