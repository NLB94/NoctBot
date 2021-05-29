const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    const guild = message.guild;
    
    const language = settings.general.language;

    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const loadingEmoji = client.emojis.resolve(client.localEmojis.loadingEmoji);
    const arrowRigth = client.emojis.resolve(client.localEmojis.arrowRight);
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    const action = args[0].toLowerCase();
    switch (action) {
        case "create": {
            if (settings.backups.Nb > 10 && !settings.general.premium) return message.channel.send({
                embed: {
                    title: await client.translate('Backup Limit', 'en', language),
                    description: await client.translate("This server has reached backups limit (10) ! If you want to create more backups, upgrade to premium (premium is not available yet).", 'en', language)
                }
            });
            let backup = {
                id: client.randomString({
                    startsWithLowerCase: true,
                    length: 6,
                    includeUpperCase: true,
                    includeNumbers: true
                }),
                roles: [],
                others: {
                    text: [],
                    voice: []
                },
                categorys: [],
                emojis: [],
                guildID: guild.id,
                guildInfo: {
                    name: guild.name,
                    region: guild.region,
                    banner: guild.banner,
                    explicitContentFilter: guild.explicitContentFilter,
                    mfaLevel: guild.mfaLevel,
                    verificationLvl: guild.verificationLvl,
                    afk: {
                        afkChannel: {
                            name: guild.afkChannel == null ? null : guild.afkChannel.name,
                            parent: guild.afkChannel == null ? null : guild.afkChannel.parent.name
                        },
                        afkTimeout: guild.afkTimeout
                    }
                }
            }
            //roles
            const roles = await client.fetchRoles(guild)
            backup.roles = roles;

            const emojis = await client.fetchEmojis(guild)
            backup.emojis = emojis;

            const textChannels = await client.fetchTextChannels(guild)
            backup.others.text = textChannels;

            const voiceChannels = await client.fetchVoiceChannels(guild)
            backup.others.voice = voiceChannels;

            const categorys = await client.fetchCategorys(guild)
            backup.categorys = categorys;

            const embed = new MessageEmbed()
                .setTitle(await client.translate('Creating Backup', 'en', language))
                .setDescription(await client.translate(`Please wait${loadingEmoji}`, 'en', language))
                .setFooter(message.author.tag, message.author.avatarURL())

            const embed2 = new MessageEmbed()
                .setTitle(await client.translate('Backup created', 'en', language))
                .setDescription(await client.translate(`${checkMark}Successfully created backup with id : \`${backup.id}\``, 'en', language))
                .setFooter(message.author.tag, message.author.avatarURL());

            message.channel.send(embed).then(msg => {
                setTimeout(() => {
                    msg.edit(embed2)
                }, 4000);
            });
            await client.createBackup({
                backupID: backup.id,
                authorID: message.author.id
            });

            setTimeout(async () => {
                await client.newBackup(backup)
            }, 4000);
            break;
        }
        case "load": {
            try {
                const code = args[1];
                const backup = await client.getBackup(code);
                const cancelEmbed = {
                    title: 'Backup',
                    description: `${x_mark}${await client.translate('Command canceled', 'en', language)} !`
                }
                if (backup == undefined) return message.channel.send({
                    embed: {
                        description: await client.translate(`No Backup found with the id \`${code}\`!`, 'en', language)
                    }
                });
                if (message.author.id !== guild.ownerID && backup.onlyServerOwner && !backup.admins) return message.channel.send({
                    embed: {
                        description: `${x_mark}${await client.translate('Only server owner can load backup !', 'en', language)}`
                    }
                });
                message.channel.send({
                    embed: {
                        description: await client.translate(`${arrowRigth}Warning ! Do you want to load the backup with id \`${args[1]}\` ? (yes or no)`)
                    }
                });
                const filter = msg => msg.author.id == message.author.id;
                const userE = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ['time']
                })
                if (userE.first().content.toLowerCase().startsWith('c') || userE.first().content.toLowerCase().startsWith('n')) return message.channel.send(cancelEmbed);
                if (userE.first().content.toLowerCase().startsWith('y') || userE.first().content.toLowerCase().startsWith('o')) {
                    const embed = new MessageEmbed()
                        .setFooter(guild.name, guild.iconURL())
                        .setTitle(await client.translate('Loading Backup', 'en', language))
                        .setDescription(await client.translate(`Please wait${loadingEmoji}`, 'en', language));
                    message.channel.send(embed)

                    setTimeout(async () => {
                        client.clearGuild(guild);

                        client.loadRoles(guild, backup);
                        client.loadEmojis(guild, backup);

                        client.loadCategorys(guild, backup);
                        client.loadOthersChannels(guild, backup);

                        await guild.setName(backup.guildName)
                    }, 1000);
                }
            } catch (e) {
                message.channel.send(cancelEmbed)
            }
            break;
        }
        case "delete": {
            const backup = client.getBackup(args[1])
            if (!backup) return message.channel.send({
                embed: {
                    description: await client.translate(`${x_mark}Invalid backup ID \`${args[1]}\``, 'en', language)
                }
            })
            client.deleteBackup(args[1])
            message.channel.send({
                embed: {
                    description: await client.translate(`${checkMark}Successfully deleted backup with ID \`${args[1]}\``, 'en', language)
                }
            })
            break;
        }
    }
};

module.exports.help = MESSAGES.COMMANDS.BACKUPS.BACKUP;