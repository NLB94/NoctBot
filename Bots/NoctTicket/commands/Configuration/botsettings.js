const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require("../../util/constants");

const functions = require("../../util/functions");

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    
          const embed = new MessageEmbed()
          .setColor("#000000")
          .setTitle(`Bot Settings in ${message.guild} :`)
          .setURL(`${client.botGuild.ticketInviteLink}`)
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`[Add Me](${client.botGuild.ticketInviteLink}) | [Support Server](${client.botGuild.supportInvite})`)
          .addFields(
              { name: `► Prefix :`, value: settings.general.ticketPrefix !== 't~' ? settings.general.ticketPrefix : "t~", inline: true},
              { name: '► Logs Channel :', value: settings.general.logs !== 'logs' ? `<#${settings.general.logs}>` : `Unspecified ! Type \`${settings.general.ticketPrefix}config logs #channel\`!`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              // { name: `► Welcome Enabled :`, value: settings.welcomeAndLeave.welcome.enable ? 'Yes' : `No.`/* For enable, type \`${settings.general.ticketPrefix}enable welcome\``*/, inline: true},
              // { name: `► Leave Enabled :`, value: settings.welcomeAndLeave.leave.enable ? 'Yes' : `No.` /*For enable, type \`${settings.general.ticketPrefix}enable leave\``*/, inline: true},
            //⌠ ⌡ ►
          )
          .setTimestamp()
          .setFooter(`By ${(await client.fetchApplication()).owner.tag}`);
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

module.exports.help = MESSAGES.COMMANDS.CONFIGURATION.BOTSETTINGS;