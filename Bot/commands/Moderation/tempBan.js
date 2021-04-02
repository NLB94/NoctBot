const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

  
  let reason = args.splice(2).join(' ') || 'Unspecified';
  const x_mark = client.emojis.resolve('806440609127596032');
  const check_mark = client.emojis.resolve('770980790242377739')
  const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
  const user = args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (message.guild.members.cache.find(m => m.tag == args[0])) : args[0]);
  const time = args[1] ? ms(args[1]) : ms('24 hours');

  if (user) {
    const member = message.guild.member(user);
    if (!member) {
      message.guild.members.ban(user).then(() => {
        const logsEmbed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`Temp-Ban : ${user} \nModerator : ${message.author} \nReason : ${reason} \nTime : ${time}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        const embed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`${check_mark}${user} has been temp-banned \nReason : ${reason} \nTime : ${time}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        if (logs !== undefined) { logs.send(logsEmbed); }
        message.channel.send(embed)

        setTimeout(async () => {
          message.guild.members.unban(user)
        }, time);
      });
    }
    else {
      if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.channel.send({embed: {description: `${x_mark}I can't ban an user who have a role highest than mine!`}});
      member.ban({ days: 7, reason: reason }).then(() => {
        user.createDM().then(() => {
          user.send(`You have been banned from ${message.guild.name} by ${message.author.tag} for reason : ${reason}.\n You will be unban in ${ms(time)}`)
        }).catch(() => '')
        const logsEmbed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`${check_mark}Temp-Ban : ${user} \nModerator : ${message.author} \nReason : ${reason} \nTime : ${time}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        const embed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`${user} has been temp-banned \nReason : ${reason}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        if (logs !== undefined) { logs.send(logsEmbed); }
        message.channel.send(embed)

        setTimeout(async () => {
          message.guild.members.unban(user);
          const logsEmbed2 = new MessageEmbed()
            .setAuthor(`${user.username}`, user.avatarURL)
            .setColor("#ef0f0f")
            .setDescription(`${check_mark}Unban : ${user} \nModerator : ${message.author} \nReason : Time-up(temp ban)`)
            .setTimestamp()
            .setFooter(message.author.username, message.author.avatarURL());
          if (logs !== undefined) { logs.send(logsEmbed2); }
        }, time);
      });
    }
  }
  else return message.channel.send({embed: { description: `${x_mark}User not found!`}});
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.TEMPBAN;