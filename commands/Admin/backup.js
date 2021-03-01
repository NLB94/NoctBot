const {
    MessageEmbed
} = require("discord.js");
const {
    MESSAGES
} = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const guild = message.guild;
    const settings = await client.getGuild(guild);
    const x_mark = client.emojis.resolve('806440609127596032');
    const loadingEmoji = client.emojis.resolve('783028992231866419');
    const checkMark = client.emojis.resolve('770980790242377739');
    const action = args[0].toLowerCase();
    switch (action) {
        case "create": {
            if (settings.backups.Nb > 10 && !settings.general.premium) return message.channel.send({
                embed: {
                    title: 'Backup Limit',
                    description: "This server has reached backups limit (10) ! If you want to create more backups, upgrade to premium (premium is not available yet)."
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
                .setTitle('Creating Backup')
                .setDescription(`Please wait${loadingEmoji}`)
                .setFooter(`${guild.name} | Requested by ${message.author.tag}`, guild.iconURL());

            const embed2 = new MessageEmbed()
                .setTitle('Backup created')
                .setDescription(`${checkMark} Successfully created backup with id : \`${backup.id}\``)
                .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());

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
                if (backup == undefined) return message.channel.send({
                    embed: {
                        description: `No Backup found with the id \`${code}\`!`
                    }
                });
                if (message.author.id !== guild.ownerID && backup.onlyServerOwner && !backup.admins) return message.channel.send({embed: {description: `${x_mark}Only server owner can load backup !`}});
                message.channel.send({embed: { description: `${x_mark}Do you want to load the backup with id \`${args[1]}\` ? (yes or no)`}});
                const filter = msg => msg.author.id == message.author.id;
                const userE = await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 20000,
                    errors: ['time']
                })
                if (userE.first().content.toLowerCase().startsWith('c') || userE.first().content.toLowerCase().startsWith('n')) return message.channel.send({embed: {title: 'Backup', description: `${x_mark}Command canceled !`}});
                if (userE.first().content.toLowerCase().startsWith('y')) {
                    const embed = new MessageEmbed()
                        .setFooter(guild.name, guild.iconURL())
                        .setTitle('Loading Backup')
                        .setDescription(`Please wait${loadingEmoji}`);
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
                message.channel.send({embed: {title: 'Backup', description: `${x_mark}Command canceled !`}})
            }
            break;
        }
        case "delete": {
            const backup = client.getBackup(args[1])
            if (!backup) return message.channel.send({embed: { description: `${x_mark}Invalid backup ID \`${args[1]}\``}})
            client.deleteBackup(args[1])
            message.channel.send({embed: {description: `${checkMark}Successfully deleted backup with ID \`${args[1]}\``}})
            break;
        }
    }


};

module.exports.help = MESSAGES.COMMANDS.BACKUPS.BACKUP;