const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../util/constants');

module.exports.run = async (client, message, args, userInfo) => {
  const settings = await client.getGuild(message.guild);


  const user = (args[0].startsWith('<@') && args[0].endsWith('>') || args[1].startsWith('<@') && args[1].endsWith('>')) ? message.guild.member(message.mentions.users.first()) : message.member;
  const support = args[0] == 'bank' || args[0] == 'cash' ? args[0].toLowerCase() : 'cash';

  const toRem = isNaN(args[1]) ? parseInt(args[2]) : parseInt(args[1]);
  if (isNaN(toRem)) return message.channel.send(`Correct usage : \`${settings.general.prefix}addmoney-role [cash | bank] @role (amount)\``)
  const dbUser = await client.getUser(user);
  if (!dbUser) await client.createUser(message.guild, user);
  const newB = support == 'bank' ? dbUser.moneyBank - toRem : dbUser.moneyCash - toRem;


  const msg = `Successfully removed ${toRem} from ${user}'s ${support} balance! Now ${user} have ${newB}!`;


  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle('Money Removed')
    .setDescription(msg)
    .setFooter(message.guild, message.guild.iconURL())
    .setTimestamp();

  client.updateUI(message.guild, user, {
    "users.$.moneyCash": newB
  })
  message.channel.send(embed);

};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.REMMONEY;