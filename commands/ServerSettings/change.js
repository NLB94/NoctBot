const { Channel } = require("discord.js");
const { ownerID } = require("../../config");
const { MESSAGES } = require("../../util/constants");
 
module.exports.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const getSetting = args[0];
    const newSetting = args.slice(1).join(" ");
    const logs = client.channels.cache.get('789919985307746304');
 
    switch(getSetting) {
        case "logs": {
            if (newSetting) {
                await client.updateGuild(message.guild, { logs: newSetting });
                return logs.send(`Logs channel changed in ${message.guild.name} : \`${newSetting}\``, message.channel.send(`Logs channel changed : \nOld logs channel : \`${settings.general.logs}\` \nNew logs channel : \`${newSetting}\``));
            }
            message.channel.send(`Logs channel in this server : \`${settings.general.logs}\``);
            break;
        }
        case "prefix": {
            if (newSetting) {
                await client.updateGuild(message.guild, { prefix: newSetting });
                return logs.send(`Prefix changed in ${message.guild.name} : \`${newSetting}\``, message.channel.send(`Prefix changed : \nOld Prefix : \`${settings.general.prefix}\` \nNew Prefix : \`${newSetting}\``));
            }
            message.channel.send(`Prefix in this server : \`${settings.general.prefix}\``);
            break;
        }
        case "welcomeMessage": {
            if (newSetting) {
                await client.updateGuild(message.guild, { welcomeMessage: newSetting });
                return logs.send(`Welcome message changed in ${message.guild.name} : \`${newSetting}\``, message.channel.send(`Welcome message changed : \nOld welcomeMessage : \`${settings.welcomeMessage}\` \nNew welcome message : \`${newSetting}\``));
            }
            message.channel.send(`Welcome message in this server : \`${settings.welcomeMessage}\``);
            break;
        }
    }
};
 
module.exports.help = MESSAGES.COMMANDS.SERVERSETTINGS.CHANGE;