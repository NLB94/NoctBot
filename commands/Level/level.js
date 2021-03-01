const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require('../../util/constants');

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild)
    const x_mark = client.emojis.resolve('806440609127596032');
    const check_mark = client.emojis.resolve('770980790242377739');
    const keys = [{
            name: 'enable',
            description: 'Enable level system.'
        }, {
            name: 'disable',
            description: 'Disable level system.'
        }, {
            name: 'roleToGive <level>',
            description: 'Give a role to an user automatically when he reach a specific level.'
        }, {
            name: 'roleToRem <level>',
            description: 'Remove a role from an user automatically when he reach a specific level.'
        }, {
            name: 'channel',
            description: 'Change level channel.'
        }, {
            name: 'color',
            description: 'Change rank card color.'
        }, {
            name: 'image',
            description: 'Change rank card background.'
        }, {
            name: 'message',
            description: 'Change level message.'
        }, {
            name: 'dmenable',
            description: 'Enable DM Message when user level up.'
        }, {
            name: 'dmMessage',
            description: 'Message to send to user in DM.'
        }, {
            name: 'boost',
            description: 'Boost of XP. Users can level up more fast.'
        }
    ]
    switch (args[0].split("-").join("").toLowerCase()) {
        case ("keys" || undefined): {
            const embed = new MessageEmbed()
                .setTimestamp()
                .setTitle('Level Settings Keys')
                .setAuthor(message.author.tag, message.author.avatarURL());

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                embed.addField(key.name, key.description, true);
            }
            message.channel.send(embed)
            break;
        }
        case "enable": {
            if (settings.levelSystem.enable) return message.channel.send({
                embed: {
                    description: `${x_mark}Level system is already enable !`
                }
            });
            await client.updateGuild(message.guild, {
                "levelSystem.enable": true
            });
            message.channel.send({
                embed: {
                    description: `${check_mark}Successfully enabled level system !`
                }
            });
            break;
        }
        case "disable": {
            if (!settings.levelSystem.enable) return message.channel.send({
                embed: {
                    description: `${x_mark}Level system is not enable !`
                }
            });
            await client.updateGuild(message.guild, {
                "levelSystem.enable": false
            });
            message.channel.send({
                embed: {
                    description: `${check_mark}Successfully disabled level system !`
                }
            });
            break;
        }
        case "roletogive": {
            if (!args[1]) return;
            const role = message.mentions.roles.first() == undefined ? (isNaN(args[1]) ? (message.guild.roles.cache.find(r => r.name.toLowerCase() == args[1].toLowerCase())) : message.guild.roles.resolve(args[1])) : message.mentions.roles.first()
            const level = parseInt(args[2] == undefined ? 10 : (isNaN(args[2])) ? 10 : args[2]);
            if (!role) return message.channel.send({
                embed: {
                    description: `${x_mark}Role not found !`
                }
            });
            else message.channel.send({
                embed: {
                    description: `${check_mark}Success ! \nWhen an user will reach level ${level}, he will get ${role} role.`
                }
            })
            break;
        }
        case "roletorem": {

            break;
        }
        case "channel": {

            break;
        }
        case "color": {

            break;
        }
        case "image": {
            break;
        }
        case "message": {
            break;
        }
        case "dmenable": {
            break;
        }
        case "dmmessage": {
            break;
        }
        case "boost": {
            break;
        }
    }
}

module.exports.help = MESSAGES.COMMANDS.LEVEL.SETTINGS;