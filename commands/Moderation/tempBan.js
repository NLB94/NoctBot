const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
  const settings = await client.getGuild(message.guild);
    let reason = args.splice(2).join(' ') || '';
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
        .setDescription(`${user} has been temp-banned \nReason : ${reason} \nTime : ${time}`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());
    
        if (logs !== undefined) { logs.send(logsEmbed);}
        message.channel.send(embed)
        
        setTimeout(async () => {
          message.guild.members.unban(user)
        }, time);
      });
      }
      else {
      if (message.guild.member(client.user).roles.highest.position <= member.roles.highest.position) return message.channel.send("I can't ban an user who have a role highest than mine!");
    member.ban({days: 7, reason: reason}).then(() => {
      const logsEmbed = new MessageEmbed()
    .setAuthor(`${user.username}`, user.avatarURL)
    .setColor("#ef0f0f")
    .setDescription(`Temp-Ban : ${user} \nModerator : ${message.author} \nReason : ${reason} \nTime : ${time}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const embed = new MessageEmbed()
    .setAuthor(`${user.username}`, user.avatarURL)
    .setColor("#ef0f0f")
    .setDescription(`${user} has been temp-banned \nReason : ${reason}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    if (logs !== undefined) { logs.send(logsEmbed);}
    message.channel.send(embed)

    setTimeout(async () => {
      message.guild.members.unban(user);
      const logsEmbed2 = new MessageEmbed()
      .setAuthor(`${user.username}`, user.avatarURL)
      .setColor("#ef0f0f")
      .setDescription(`Unban : ${user} \nModerator : ${message.author} \nReason : Time-up(temp ban)`)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL());
      if (logs !== undefined) { logs.send(logsEmbed2);}
    }, time);
    });
        }}
        else return message.channel.send('User not found!');
      };
  
  module.exports.help = MESSAGES.COMMANDS.MODERATION.TEMPBAN;