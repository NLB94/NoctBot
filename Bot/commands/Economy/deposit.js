const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  const language = settings.general.language;
  const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

  if (isNaN(args[0]) && !args[0].toLowerCase().startsWith('al')) return message.channel.send({
    embeds: [{
      description: `${x_mark}${strings.usage} \`${settings.general.prefix}dep ${module.exports.help.usage}\``
    }]
  });

  const toDep = args[0].toLowerCase().startsWith('al') ? parseInt(userInfo.moneyCash) : parseInt(args[0]);
  let desc = ``
  if (toDep > userInfo.moneyCash) {
    desc += `${x_mark}${strings.economy.dep.notEnough.replace("{cash}", userInfo.moneyCash)}`,
      toDep = userInfo.moneyCash
  };

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle(strings.economy.dep.title)
    .setDescription((desc.startsWith(`${x_mark}`) ? "\n" : "") + `${checkMark}${strings.economy.dep.desc.replace("{toDep}", toDep).replace("{user}", message.author)}`)
    .setFooter(message.guild, message.guild.iconURL())
    .setTimestamp();

  const newBank = toDep + userInfo.moneyBank;
  const newB = userInfo.moneyCash - toDep;

  client.updateGuildUI(message.guild, message.member, {
    "users.$.moneyBank": newBank
  });
  client.updateGuildUI(message.guild, message.member, {
    "users.$.moneyCash": newB
  });
  message.channel.send({
    embeds: [embed]
  });
};


module.exports.underCat = MESSAGES.COMMANDS.ECONOMY.MANAGE;

module.exports.help = MESSAGES.COMMANDS.ECONOMY.MANAGE.DEPOSIT;