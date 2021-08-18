const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../../util/constants");
const moment = require("moment");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
  const check_mark = client.emojis.resolve(client.localEmojis.checkMark)
  const channel = args[0] ? (args[0].startsWith('<#') && args[0].endsWith('>') ? message.mentions.channels.first() : (isNaN(args[0]) ? message.guild.channels.cache.find(c => args[0].toLowerCase() == c.name.toLowerCase()) : message.guild.channels.resolve(args[0]))) : message.channel;

  if (!channel || channel == '\u200b' || channel.type == 'dm') return message.channel.send({embeds: [{description: `${x_mark}Channel not found!`}]});

  if (!channel.isText()) return message.channel.send({embeds: [{description: `${x_mark}Channel not found!`}]});;

  if (channel && channel !== '\u200b') {
    const embed = new MessageEmbed()
      .setColor("#000000")
      .setAuthor(message.guild.name, message.guild.iconURL())
      .addField("")
      .addField('ID :', `${channel.id}`, true)
      .addField('\u200b', '\u200b', true)
      channel.topic == undefined ? '' : embed.setDescription(`Topic : **${channel.topic}**`);
      embed.addField('Category :', `**${channel.parentID == undefined ? 'None' : `Name : ${channel.parent.name} (${channel.parentID})`}**`, true)
      .addField('Created at :', `**${moment(channel.createdAt).format('ddd, DD/MM/YYYY HH:mm')} (${(Math.round(Math.floor(Date.now() - channel.createdAt) / (1000 * 3600 * 24)))} days ago)**`, true)
      .addField('\u200b', '\u200b', true)
      //retirer les msgs du cache
      .addField('Messages in cache :', `${channel.messages == undefined || !channel.messages ? '\u200b' : channel.messages.cache.size }`, true)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL());

    message.channel.send({embeds: [embed]});
  };
};
module.exports.underCat = MESSAGES.COMMANDS.INFO.GUILD;

module.exports.help = MESSAGES.COMMANDS.INFO.GUILD.CHANNELINFO;