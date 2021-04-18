const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../util/constants");

const functions = require("../../util/functions");

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {


    const getSetting = args[0].toLowerCase().split("-").join("");
    const prefix = settings.general.ticketPrefix;
    let newSetting = args.slice(1).join(" ");
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark)
    const arrowRight = client.emojis.resolve(client.localEmojis.arrowRight);
    //const logs = client.channels.cache.get('789919985307746304');
    const keys = ["logs", "prefix", "language"];
    const language = settings.general.language;

    switch (getSetting) {
        case "keys": {
            const embed = new MessageEmbed()
                .setAuthor(client.user.tag, client.user.avatarURL(), `${client.botGuild.ticketInviteLink}`)
                .setTitle('Config Keys')
                .setURL('https://discord.gg/unRX2SUcvw')
                .setTimestamp()
                .setDescription(`${language == 'fr'? 'Si vous voulez de l\'aide, rejoignez le [serveur de support](https://discord.gg/unRX2SUcvw). \n\nListe des disponibilités :' : 'If you need help, join [support server](https://discord.gg/unRX2SUcvw). \n\nAvailable Keys :'} \n${keys.join(", ")}`)
                .setFooter(message.author.tag, message.author.avatarURL());

            message.channel.send(embed);
            break;
        }
        case "logs": {
            if (newSetting) {
                const channel = isNaN(args[1]) ? (args[0].startsWith('<#') && args[0].endsWith('>') ? message.mentions.channels.first().id : (message.guild.channels.cache.find(c => c.name.toLowerCase() == newSetting.toLowerCase()) == undefined ? 'none' : message.guild.channels.cache.find(c => c.name.toLowerCase() == newSetting.toLowerCase()).id)) : (message.guild.channels.cache.get(args[1]) == undefined ? 'none' : args[1])
                newSetting = channel;
                if (newSetting = undefined || newSetting == 'none') return message.channel.send({
                    embed: {
                        description: `${x_mark}**${language == 'fr' ? 'Le salon est introuvable' : 'Channel not found'}** !`
                    }
                })
                await client.updateGuild(message.guild, {
                    "general.logs": newSetting
                });
                return message.channel.send({
                    embed: {
                        description: `${check_mark}${language == 'fr' ? 'Salon des logs changé : \nAvant' : 'Logs channel changed : \nOld Logs channel'} : \`${settings.general.logs}\` \n${language == 'fr' ? 'Maintenant' : 'New logs channel'} : \`${newSetting}\``
                    }
                });
            }
            message.channel.send({
                embed: {
                    description: `${arrowRight}${language == 'fr' ? 'Le salon de logs dans ce serveur' : 'Logs channel in this server'} : \`${settings.general.logs}\``
                }
            });
            break;
        }
        case "prefix": {
            if (newSetting) {
                if (newSetting == prefix) return message.channel.send({
                    embed: {
                        description: `${x_mark}${language == 'fr' ? 'Le préfixe dans ce serveur est déja'  : 'Prefix in this server is already'} \`${newSetting}\` !`
                    }
                })
                newSetting = newSetting.slice(0, 3)
                await client.updateGuild(message.guild, {
                    "general.ticketPrefix": newSetting
                });
                return message.channel.send({
                    embed: {
                        description: `${check_mark}${language == 'fr' ? 'Préfixe changé' : 'Prefix changed'} : \n${language == 'fr' ? 'Ancien préfixe' : 'Old Prefix'} : \`${prefix}\` \n${language == 'fr' ? 'Nouveau préfixe' : 'New Prefix'} : \`${newSetting}\``
                    }
                });
            }
            message.channel.send({
                embed: {
                    description: `${arrowRight}${language == 'fr' ? 'Préfixe dans ce serveur' : 'Prefix in this server'} : \`${prefix}\``
                }
            });
            break;
        }
        case "language": {
            if (newSetting) {
                if (newSetting == language) return message.channel.send({
                    embed: {
                        description: `${x_mark}${language == 'fr' ? 'La langue dans ce serveur est déjà' : 'Language in this server is already'} \`${newSetting}\` !`
                    }
                })
                newSetting = newSetting.slice(0, 2)
                if (newSetting == 'fr' || newSetting == 'en') {
                    message.channel.send({
                        embed: {
                            description: `${check_mark}${language == 'fr' ? `Langue changée : \nAvant : \`${language}\` \nAprès` : `Language changed : \nBefore : \`${language}\` \nAfter`} : \`${newSetting}\``
                        }
                    });
                    await client.updateGuild(message.guild, {
                        "general.language": newSetting
                    });
                } else message.channel.send({
                    embed: {
                        description: `${x_mark}${language == 'fr' ? "**Cette langue n'est pas supportée !**\n**Langues supportées : \`en\`, \`fr\`**" : "**This language is not supported !** \n**Supported language : \`en\`, \`fr\`**"}`
                    }
                })
                break;
            }
            message.channel.send({
                embed: {
                    description: `${arrowRight}${language == 'fr' ? 'Langue dans ce serveur' : 'Language in this server'} : \`${language}\``
                }
            });
            break;
        }
    }
};

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.CHANGE;