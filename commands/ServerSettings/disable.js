const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");
 
const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const getSetting = args[0].toLowerCase();
    const x_mark = client.emojis.resolve('806440609127596032');
    const check_mark = client.emojis.resolve('770980790242377739')
   //const logs = client.channels.cache.get('789919985307746304');
   const keys = ["captcha - Not ready", "welcome - Disable Welcome System", "leave - Disable Leave System", "ticket - Not ready yet", "antlink - Block all links started (http/https)", "antiinvite - Block all discord invites (discord.gg)", "level - Disable level system"]
 
    switch(getSetting) {
        case "keys": {
            const embed = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
            .setTitle('Keys')
            .setURL('https://discord.gg/unRX2SUcvw')
           .setTimestamp()
           .setDescription(`If you need help, join [support server](https://discord.gg/unRX2SUcvw). \n\nAvailable Keys : \n${keys.join("\n")}`)
           .setFooter(`Requested by ${message.author.tag} in ${message.guild.name}`, message.guild.iconURL());

           message.channel.send(embed);
           break;
        }
        case "captcha": {
            message.channel.send({embed: {description: `${x_mark}Captcha system is not ready yet...`}})
            // if (!settings.captcha.cEnable) return message.channel.send('Captcha is already disable !');
            //     await client.updateGuild(message.guild, { "captcha.cEnable": false });
            // message.channel.send(`Captcha System Disabled Successfully !`);
            break;
        }
        case "ticket": {
            message.channel.send({embed: {description: `${x_mark}Ticket system is not ready yet...`}})
            // if (!settings.ticket.tEnable) return message.channel.send('Ticket is already disable !');
            //     await client.updateGuild(message.guild, { "ticket.tEnable": false });
            // message.channel.send(`Ticket System Disabled Successfully !`);
            break;
        }
        case "welcome": {
            if (!settings.welcomeAndLeave.welcome.enable) return message.channel.send({embed: {title: 'Server Settings', description: `${x_mark} Welcome system is already disable !`}});
                await client.updateGuild(message.guild, { "welcomeAndLeave.welcome.enable": false });
                message.channel.send({embed: {title: 'Server Settings', description: `${check_mark}Successfully disabled welcome system !`}});
            break;
        }
        case "leave": {
            if (!settings.welcomeAndLeave.leave.enable) return message.channel.send({embed: {title: 'Server Settings', description: `${x_mark} Leave system is already disable !`}});
                await client.updateGuild(message.guild, { "welcomeAndLeave.leave.enable": false });
                message.channel.send({embed: {title: 'Server Settings', description: `${check_mark}Successfully disabled leave system !`}});
            break;
        }
        case "level": {
        if (!settings.levelSystem.enable) return message.channel.send({embed: {title: 'Server Settings', description: `${x_mark} Level system is already disable !`}});
            await client.updateGuild(message.guild, { "levelSystem.enable": false });
            message.channel.send({embed: {title: 'Server Settings', description: `${check_mark}Successfully disabled level system !`}});
        break;
        }
    }
};
 
module.exports.help = MESSAGES.COMMANDS.SERVERSETTINGS.DISABLE;