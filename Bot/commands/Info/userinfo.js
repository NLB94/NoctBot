const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../../util/constants");
const moment = require("moment");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings) => {
  const x_mark = client.emojis.resolve('806440609127596032');
  const check_mark = client.emojis.resolve('770980790242377739')
  const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()) == undefined ? client.users.cache.find(m => m.username.toLowerCase() == args[0].toLowerCase()) : message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()).user)) : client.users.cache.get(args[0]))) : message.author;
  const member = message.guild.member(user);

  if (!user || user === '\u200b') return message.channel.send({embed: {description: `${x_mark}User not found!`}});

  if (user && user !== '\u200b') {
    const dbUser = await client.getGuildUser(message.guild, member);

    const customStat = user.presence.activities.length > 0 ? user.presence.activities.find(a => a.type == 'CUSTOM_STATUS') : '';

    const embed = new MessageEmbed()
      .setColor("#000000")
      .setTitle(user.tag)
      .setThumbnail(user.avatarURL())
      member == undefined ? '' : embed.addField('Nickname :', member.nickname == undefined ? 'None' : member.nickname);
      embed.addField('ID :', `${user.id}`, true)
      !customStat ? '' : embed.addField('Custom Status', `Name : ${customStat.name} \nDescription : ${customStat.emoji ? (customStat.emoji.name ? customStat.emoji.name : '') : ''}${customStat.state}`)
      .addField('\u200b', '\u200b')
      .setTimestamp()
      .setFooter("By <I2Z7/>");

    if (member && member.roles.cache.size > 1) embed.addField('\u200b', '\u200b'), embed.addField('User Roles :', `${member.roles.cache.map(r => `<@&${r.id}>`).join(', ')}`)
    if (member && !member.premiumSince) embed.addField('\u200b', '\u200b'), embed.addField('Is Booster :', 'No'), embed.addField('\u200b', '\u200b')
    else if (member && member.premiumSince) {
      embed.addField('Booster Since :', `${moment(member.premiumSince).format('ddd, DD/MM/YYYY HH:mm')} (${(Math.round(Math.floor(Date.now() - member.premiumSince) / (1000 * 3600 * 24)))} days ago)`, true)
    };
    if (member) {
      embed.addField('Joined server at :', `${moment(member.joinedAt).format('ddd, DD/MM/YYYY HH:mm')} (${(Math.round(Math.floor(Date.now() - member.joinedAt) / (1000 * 3600 * 24)))} days ago)`, true)
    } else if (!member) {
      embed.setDescription(embed.description + '\n' + `${x_mark} This user is not in this guild.`)
    }
    embed.addField('Joined Discord At :', `${moment(user.createdAt).format('ddd, DD/MM/YYYY HH:mm')} (${(Math.round(Math.floor(Date.now() - user.createdAt) / (1000 * 3600 * 24)))} days ago)`, true);

    if (member) {
      if (dbUser) embed.addField('Message Sent', `${dbUser.messageSent} message(s)`)
      if (dbUser && dbUser.warns > 0) embed.addField('Infractions :', `${dbUser.warns} warn(s)`);
      if (member.hasPermission('BAN_MEMBERS', true)) embed.addField('Administrator :', `${check_mark}`)
      else if (member.hasPermission('SEND_MESSAGES', false)) embed.addField('Administrator :', `${x_mark}`);
    }
    message.channel.send(embed);
  };
};

module.exports.help = MESSAGES.COMMANDS.INFO.USERINFO;