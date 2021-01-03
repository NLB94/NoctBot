const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
  
    let reason = (args.splice(1).join(' ') || '');
    const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const user = args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (message.guild.members.cache.find(m => m.tag == args[0])) : args[0]);

    if (user) {
      const member = message.guild.member(user);
      if (!member) return message.reply("That user isn't in this guild!");
      else {
      if (member.hasPermission('BAN_MEMBERS', true)) return message.channel.send("I can't kick an admin!");
      if (message.guild.member(client.user).roles.highest.position <= member.roles.highest.position) return message.channel.send("I can't kick an user who have a role highest than mine!");
    const logsEmbed = new MessageEmbed()
    .setAuthor(`${user.username}`, user.avatarURL)
    .setColor("#ef0f0f")
    .setDescription(`Kick : ${user} \nModerator : ${message.author} \nReason : ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const embed = new MessageEmbed()
    .setAuthor(`${user.username}`, user.avatarURL)
    .setColor("#ef0f0f")
    .setDescription(`${user} has been kicked \nReason : ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    message.channel.send(embed)

    if (member) {
        member.kick(reason)
          .then(() => {
            if (logs !== undefined) { logs.send(logsEmbed);}
          })
          .catch(err => {
          message.reply("Can't kick!");
          console.log(err);
          });
      }}
    }
    else return message.reply('User not found')
  };
  
  
  module.exports.help = MESSAGES.COMMANDS.MODERATION.KICK;