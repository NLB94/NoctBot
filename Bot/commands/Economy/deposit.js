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

  if (isNaN(args[0]) && !args[0].toLowerCase().startsWith('al')) return message.channel.send({
    embed: {
      description: `${x_mark}Correct usage : \`${settings.general.prefix}deposit ${module.exports.help.usage}\``
    }
  });

  const toDep = args[0].toLowerCase().startsWith('al') ? parseInt(userInfo.moneyCash) : parseInt(args[0]);

  if (toDep > userInfo.moneyCash) return message.channel.send({
    embed: {
      description: `${x_mark}You have only ${userInfo.moneyCash} on your hand!`
    }
  });

  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle('Deposit to bank')
    .setDescription(`${checkMark}Successfully deposited ${toDep} to ${message.author}'s bank!`)
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
  message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.DEPOSIT;