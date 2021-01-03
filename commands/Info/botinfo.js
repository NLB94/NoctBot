const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message) => {
    const settings = await client.getGuild(message.guild);
          const embed = new MessageEmbed()
          .setColor("#000000")
          .setTitle("I2Z7#3148")
          .setURL('https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription('[Add Me](https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847) | [Support Server](https://discord.gg/92ffufA)')
          .addFields(
              { name: '• ID', value: '735824367698837555', inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: '• Owner', value: 'ηLβ 94', inline: true},
              { name: '• Bot Servers Count :', value: `${client.guilds.cache.size}`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: '• Bot Members Count :', value: `${client.users.cache.size}`, inline: true},
              { name: '• Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: '• Memory', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true},
              { name: `Bot Settings in ${message.guild} :`, value: `\u200b`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: `► Prefix :`, value: settings.general.prefix !== '~' ? settings.general.prefix : "~", inline: true},
              { name: '► Logs Channel :', value: settings.general.logs !== 'logs' ? `<#${settings.general.logs}>` : `Undefined ! Type \`${settings.general.prefix}config logs #channel\`!`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: `► Welcome Enabled :`, value: settings.welcomeAndLeave.wEnable ? 'Yes' : `No. For enable, type \`${settings.general.prefix}enable welcome\``, inline: true},
              { name: `► Leave Enabled :`, value: settings.welcomeAndLeave.lEnable ? 'Yes' : `No. For enable, type \`${settings.general.prefix}enable leave\``, inline: true},
            //   { name: `Prefix :`, value: settings.general.prefix !== '~' ? settings.general.prefix : "~", inline: true},
            //   { name: `Prefix :`, value: settings.general.prefix !== '~' ? settings.general.prefix : "~", inline: true},
            //   { name: `Prefix :`, value: settings.general.prefix !== '~' ? settings.general.prefix : "~", inline: true},
              //⌠ ⌡ ►
          )
          .setTimestamp()
          .setFooter("By ηLβ 94");
        //   if (settings.wChannel) embed.addField('• Welcome Channel :', `${settings.wChannel}`, true)
        //   else embed.addField('• Welcome Channel :', '\u200b', true);
        //   embed.addField('\u200b', '\u200b', true);
        //   if (settings.wRole) embed.addField('• Welcome Autorole :', `${settings.wRole}`, true)
        //   else embed.addField('• Welcome Autorole :', '\u200b', true);
        //   embed.addField('\u200b', '\u200b', true);
        //   if (settings.wMessage) embed.addField('• Welcome Message :', `${settings.wMessage}`, true)
        //   else embed.addField('• Welcome Message :', '\u200b', true);
        //   embed.addField('\u200b', '\u200b', true);
        //   if (settings.lChannel) embed.addField('• Leave Channel :', `${settings.lChannel}`, true)
        //   else embed.addField('• Leave Channel :', '\u200b', true);
        //   embed.addField('\u200b', '\u200b', true);
        //   if (settings.lMessage) embed.addField('• Leave Message :', `${settings.lMessage}`, true)
        //   else embed.addField('• Leave Message :', '\u200b', true);
  
          message.channel.send(embed);
    };

module.exports.help = MESSAGES.COMMANDS.INFO.BOTINFO;