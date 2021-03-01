const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");
 
const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const getSetting = args[0].toLowerCase().split("-").join("");
    const prefix = settings.general.prefix;
    let newSetting = args.slice(1).join(" ");
    const x_mark = client.emojis.resolve('806440609127596032');
    const check_mark = client.emojis.resolve('770980790242377739')
    const arrowRight = client.emojis.resolve('770976808899444776');
   //const logs = client.channels.cache.get('789919985307746304');
   const keys = ["logs", "prefix", "banMessage"]
 
    switch(getSetting) {
        case "keys": {
            const embed = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
            .setTitle('Config Keys')
            .setURL('https://discord.gg/unRX2SUcvw')
           .setTimestamp()
           .setDescription(`If you need help, join [support server](https://discord.gg/unRX2SUcvw). \n\nAvailable Keys : \n${keys.join(", ")}`)
           .setFooter(`Requested by ${message.author.tag} in ${message.guild.name}`, message.guild.iconURL());

           message.channel.send(embed);
           break;
        }
        case "logs": {
            if (newSetting) {
                const channel = isNaN(args[1]) ? (args[0].startsWith('<#') && args[0].endsWith('>') ? message.mentions.channels.first().id : (message.guild.channels.cache.find(c => c.name.toLowerCase() == newSetting.toLowerCase()) == undefined ? 'none' : message.guild.channels.cache.find(c => c.name.toLowerCase() == newSetting.toLowerCase()).id)) : (message.guild.channels.cache.get(args[1]) == undefined ? 'none' : args[1])
                newSetting = channel;
                if (newSetting = undefined || newSetting == 'none') return message.channel.send({embed: {title: 'Server Settings', description: `${x_mark}Channel not found`}})
                await client.updateGuild(message.guild, { "general.logs": newSetting });
                return message.channel.send({embed: {title: 'Server Settings', description: `${check_mark}Logs channel changed : \nOld logs channel : \`${settings.general.logs}\` \nNew logs channel : \`${newSetting}\``}});
            }
            message.channel.send({embed: {title: 'Server Settings', description: `${arrowRight}Logs channel in this server : \`${settings.general.logs}\``}});
            break;
        }
        case "money": {
            if (newSetting) {
                newSetting = newSetting.slice(0, 2);
                await client.updateGuild(message.guild, { "economy.money": newSetting });
                return message.channel.send({embed: {title: 'Server Settings', description: `${check_mark}Money prefix changed : \nOld Money prefix : \`${settings.economy.money}\` \nNew Money prefix : \`${newSetting}\``}});
            }
            message.channel.send({embed: {title: 'Server Settings', description: `${arrowRight}Money prefix in this server : \`${settings.economy.money}\``}});
            break;
        }
        case "prefix": {
            if (newSetting) {
                if (newSetting == prefix) return message.channel.send({embed: {title: 'Server Settings', description: `${x_mark}Prefix in this server is already \`${newSetting}\` !`}})
                newSetting = newSetting.slice(0, 3)
                await client.updateGuild(message.guild, { "general.prefix": newSetting });
                return message.channel.send({embed: {title: 'Server Settings', description: `${check_mark}Prefix changed : \nOld Prefix : \`${prefix}\` \nNew Prefix : \`${newSetting}\``}});
            }
            message.channel.send({embed: {title: 'Server Settings', description: `${arrowRight}Prefix in this server : \`${prefix}\``}});
            break;
        }
        case ("banmsg" || "banmessage"): {
            if (newSetting) {
                newSetting = newSetting.slice(0, 100);
                await client.updateGuild(message.guild, { "moderation.banMsg": newSetting});
                return message.channel.send({embed: {title: 'Server Settings', description: `${check_mark}Ban Message is now : \`${newSetting}\``}})
            }
            message.channel.send({embed: {title: 'Server Settings', description: `${arrowRight}Ban Message is : \`${settings.moderation.banMsg}\``}});
            break;
        }
    }
};
 
module.exports.help = MESSAGES.COMMANDS.SERVERSETTINGS.CHANGE;