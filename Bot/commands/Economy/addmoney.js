const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

  const language = settings.general.language;
  const support = args[0].toLowerCase() == 'bank' || (args[0]).toLowerCase() == 'cash' ? args.shift().toLowerCase() : 'cash';
  let user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;
  if (!user) return message.channel.send(strings.userNtFnd);

  const toAdd = isNaN(args[0]) ? (isNaN(args[1]) ? parseInt(args[2]) : parseInt(args[1])) : parseInt(args[0]);
  if (isNaN(toAdd)) return message.channel.send({
    embeds: [{
      description: `${x_mark}${strings.usage} : \`${settings.general.prefix}${module.exports.help.name} ${module.exports.help.usage}\``
    }]
  })
  userInfo = user.id == message.author.id ? userInfo : await client.getGuildUser(message.guild, user);
  if (!userInfo) await client.createGuildUser(message.guild, user);
  const newB = support == 'bank' ? userInfo.moneyBank + toAdd : userInfo.moneyCash + toAdd;
  const supportName = strings.economy[support + '2'];

  const msg = `${checkMark}${strings.economy.addmoney.desc.replace("{toAdd}", toAdd).replace("{supportName}", supportName).replace("{user}", user).replace("{newB}", newB)}`;


  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle(strings.economy.addmoney.title)
    .setDescription(msg)
    .setFooter(message.guild, message.guild.iconURL())
    .setTimestamp();

  client.updateGuildUI(message.guild, user, {
    "users.$.moneyCash": support == 'bank' ? userInfo.moneyCash : newB,
    "users.$.moneyBank": support == 'bank' ? newB : userInfo.moneyBank,
  })
  message.channel.send({
    embeds: [embed]
  });
};


module.exports.underCat = MESSAGES.COMMANDS.ECONOMY.ADMIN;

module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADMIN.ADDMONEY;