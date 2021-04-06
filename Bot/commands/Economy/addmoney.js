const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
  const checkMark = client.emojis.resolve('770980790242377739');
  const x_mark = client.emojis.resolve('806440609127596032');

  const language = settings.general.language;
  const support = args[0].toLowerCase() == 'bank' || (args[0]).toLowerCase() == 'cash' ? args[0].toLowerCase() : 'cash';
  let user = args[0] !== support ? (args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author) : (args[1] ? (args[1].startsWith('<@') && args[1].endsWith('>') ? message.mentions.users.first() : (isNaN(args[1]) ? (args[1].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[1].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[1].toLowerCase()))) : client.users.resolve(args[1]))) : message.author);
  if (!user) user = message.author;

  const toAdd = isNaN(args[0]) ? (isNaN(args[1]) ? parseInt(args[2]) : parseInt(args[1])) : parseInt(args[0]);
  if (isNaN(toAdd)) return message.channel.send({
    embed: {
      description: `${x_mark}${await client.translate('Correct usage', 'en', language)} : \`${settings.general.prefix}addmoney ${module.exports.help.usage}\``
    }
  })
  userInfo = user.id == message.author.id ? userInfo : await client.getGuildUser(message.guild, user);
  if (!userInfo) await client.createGuildUser(message.guild, user);
  const newB = support == 'bank' ? userInfo.moneyBank + toAdd : userInfo.moneyCash + toAdd;


  const msg = await client.translate(`${checkMark}Successfully added ${toAdd} to ${user}'s ${support} balance! Now ${user} have ${newB}!`, 'en', language);


  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle(await client.translate('Money Added', 'en', language))
    .setDescription(msg)
    .setFooter(message.guild, message.guild.iconURL())
    .setTimestamp();

  client.updateGuildUI(message.guild, user, {
    "users.$.moneyCash": support == 'bank' ? userInfo.moneyCash : newB,
    "users.$.moneyBank": support == 'bank' ? newB : userInfo.moneyBank,
  })
  message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADDMONEY;