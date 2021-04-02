const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, userInfo) => {
  

  const checkMark = client.emojis.resolve('770980790242377739');
  const x_mark = client.emojis.resolve('806440609127596032');

  const language = settings.general.language;
  const user = (args[0].startsWith('<@') && args[0].endsWith('>') || args[1].startsWith('<@') && args[1].endsWith('>')) ? message.guild.member(message.mentions.users.first()) : message.member;
  const support = args[0].toLowerCase() == 'bank' || (args[0]).toLowerCase() == 'cash' ? args[0].toLowerCase() : 'cash';

  const toAdd = isNaN(args[1]) ? parseInt(args[2]) : parseInt(args[1]);
  if (isNaN(toAdd)) return message.channel.send({
    embed: {
      description: `${x_mark}${await client.translate('Correct usage', 'en', language)} : \`${settings.general.prefix}addmoney ${module.exports.help.usage}\``
    }
  })
  const dbUser = await client.getGuildUser(message.guild, user);
  if (!dbUser) await client.createGuildUser(message.guild, user);
  const newB = support == 'bank' ? dbUser.moneyBank + toAdd : dbUser.moneyCash + toAdd;


  const msg = await client.translate(`${checkMark}Successfully added ${toAdd} to ${user}'s ${support} balance! Now ${user} have ${newB}!`, 'en', language);


  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle(await client.translate('Money Added', 'en', language))
    .setDescription(msg)
    .setFooter(message.guild, message.guild.iconURL())
    .setTimestamp();

  client.updateGuildUI(message.guild, user, {
    "users.$.moneyCash": newB
  })
  message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADDMONEY;