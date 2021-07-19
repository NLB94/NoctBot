const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;

  const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark)

  if (user == undefined) return message.channel.send({
    embeds: [{
      description: `${x_mark}**User not found !**`
    }]
  })
  userInfo = user.id == message.author.id ? userInfo : await client.getGuildUser(message.guild, message.guild.members.resolve(user))
  if (!userInfo) return;
  else {
    const embed = new MessageEmbed()
      .setAuthor(user.tag, user.avatarURL())
      .setTimestamp()
      .setDescription(`${user.tag} have : \n💵Cash : ${userInfo.moneyCash} \n🏦Bank : ${userInfo.moneyBank} \n💹Net Worth : ${Math.floor(userInfo.moneyCash + userInfo.moneyBank)}`)
      .setFooter(message.guild.name, message.guild.iconURL());

    message.channel.send({embeds: [embed]});
  };
};


module.exports.underCat = MESSAGES.COMMANDS.ECONOMY.MANAGE;

module.exports.help = MESSAGES.COMMANDS.ECONOMY.MANAGE.MONEY;