const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

  //RAJOUTER L'EMOJI BANNNNNNNNNNNNNNN
  let reason = args.splice(1).join(' ') || 'Unspecified';
  const logs = settings.general.logs == 'logs' ? 'None' : message.guild.channels.cache.find(c => c.id == settings.general.logs);
  const user = args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (message.guild.members.cache.find(m => m.tag == args[0])) : args[0]);
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
  const check_mark = client.emojis.resolve(client.localEmojis.checkMark)

  if (user) {
    const member = await message.guild.members.resolve(user);
    if (!member) {
      message.guild.members.ban(user.id).then(async () => {
        const logsEmbed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`${check_mark}Ban : ${user} \nModerator : ${message.author} \nReason : ${reason}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        const embed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`${check_mark} ${user} has been banned \nReason : ${reason}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());
          
        await message.channel.send(embed)
        if (logs !== undefined) logs.send(logsEmbed);
        
      });
    } else {
      if (member.permissions.has('BAN_MEMBERS', true)) return message.channel.send("I can't ban an admin!");
      if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.channel.send("I can't ban an user who have a role highest than mine!");
      member.ban({
        days: 7,
        reason: reason
      }).then(() => {
        user.createDM().then(() => {
          user.send(`You have been banned from ${message.guild.name} by ${message.author.tag} for reason : ${reason}`)
        }).catch(() => '');
        const logsEmbed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`${check_mark} Ban : ${user} \nModerator : ${message.author} \nReason : ${reason}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        const embed = new MessageEmbed()
          .setAuthor(`${user.username}`, user.avatarURL)
          .setColor("#ef0f0f")
          .setDescription(`${check_mark} ${user} has been banned \nReason : ${reason}`)
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());

        if (logs !== undefined) {
          logs.send(logsEmbed);
        }
        message.channel.send(embed)
      });
    }
  } else return message.channel.send({
    embed: {
      description: `${x_mark}User not found!`
    }
  });
};
module.exports.underCat = MESSAGES.COMMANDS.MODERATION.MEMBERMANAGER;

module.exports.help = MESSAGES.COMMANDS.MODERATION.MEMBERMANAGER.BAN;