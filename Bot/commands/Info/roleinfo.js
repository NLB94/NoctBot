const {
  MessageEmbed
} = require("discord.js");
const {
  MESSAGES
} = require("../../../util/constants");
const moment = require("moment");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
  const x_mark = client.emojis.resolve('806440609127596032');
  const check_mark = client.emojis.resolve('770980790242377739')
  const role = args[0] ? (args[0].startsWith('<@&') && args[0].endsWith('>') ? message.mentions.roles.first() : (isNaN(args[0]) ? message.guild.roles.cache.find(r => args[0].toLowerCase() == r.name.toLowerCase()) : message.guild.roles.resolve(args[0]))) : null;

  if (!role || role == '\u200b') return message.channel.send({
    embed: {
      description: `${x_mark}Role not found!`
    }
  });

  if (role && role !== '\u200b') {
    const embed = new MessageEmbed()
      .setColor("#000000")
      .setTitle(role.name)
      .addField('ID :', `${role.id}`, true)
      .addField('\u200b', '\u200b', true)
      .addField('Position :', `**${role.position}**`, true)
      .addField('Created at :', `**${moment(role.createdAt).format('ddd, DD/MM/YYYY HH:mm')} (${(Math.round(Math.floor(Date.now() - role.createdAt) / (1000 * 3600 * 24)))} days ago)**`, true)
      .addField('\u200b', '\u200b', true)
      .addField('Role\'s members :', `**${role.members == undefined || !role.members ? '\u200b' : role.members.size }**`, true)
      .addField('Color :', `**${role.color} (${role.hexColor})**`)
      .addField('\u200b', '\u200b', true)
      .addField('Administrator :', `${role.permissions.has('ADMINISTRATOR') ? `${check_mark}` : `${x_mark}`} \nPermissions bitfield : **${role.permissions.bitfield}**`)
      .addField('Hoist :', `${role.hoist ? `${check_mark}` : `${x_mark}`}`, true)
      .addField('\u200b', '\u200b', true)
      .addField('Mentionable :', `${role.mentionable ? `${check_mark}` : `${x_mark}`}`, true)
      .setTimestamp()
      .setFooter("By <I2Z7/>");

    message.channel.send(embed);
  };
};

module.exports.help = MESSAGES.COMMANDS.INFO.ROLEINFO;