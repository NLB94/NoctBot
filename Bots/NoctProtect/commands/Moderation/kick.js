const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

  
    let reason = (args.splice(1).join(' ') || 'Unspecified');
    const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;

    if (user) {
      const member = message.guild.members.resolve(user);
      if (!member) return message.reply("That user isn't in this guild!");
      else {
      if (member.hasPermission('BAN_MEMBERS', true)) return message.channel.send("I can't kick an admin!");
      if (message.guild.me.roles.highest.position <= member.roles.highest.position) return message.channel.send("I can't kick an user who have a role highest than mine!");
   


    if (member) {
        member.kick(reason)
          .then(() => {
            user.createDM().then(() => {
                user.send(`You have been kicked from ${message.guild.name} by ${message.author.tag} for reason : ${reason} \nYou can re-join server if you want.`)
            }).catch(() => '')
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
            if (logs !== undefined) { logs.send(logsEmbed);}
    message.channel.send(embed)
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