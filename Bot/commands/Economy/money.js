const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings) => {
  if (!args.length) {
  if (message.author.bot) return;
  const userInfo = await client.getGuildUser(message.guild, message.member)
  if (!userInfo) return;
  else {
    const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp()
    .setDescription(`${message.author.tag} have : \n💵Cash : ${userInfo.moneyCash} \n🏦Bank : ${userInfo.moneyBank} \n💹Net Worth : ${Math.floor(userInfo.moneyCash + userInfo.moneyBank)}`)
    .setFooter(message.guild, message.guild.iconURL());
  
  message.channel.send(embed);
};
  }
  else {
    if (args[0] && args[0].startsWith('<@')&& args[0].endsWith('>')) {
  if (message.mentions.users.first().bot) return message.channel.send("Bots have unlimited amount of money!");
  const user = message.mentions.users.first();
  const dbUser = await client.getGuildUser(message.guild, message.guild.member(user));
  if (!dbUser) return;
  else {
    const embed = new MessageEmbed()
    .setAuthor(user.tag, user.avatarURL())
    .setTimestamp()
    .setDescription(`${user.tag} have : \n💵Cash : ${dbUser.moneyCash} \n🏦Bank : ${dbUser.moneyBank} \n💹Net Worth : ${Math.floor(dbUser.moneyCash + dbUser.moneyBank)}`)
    .setFooter(message.guild, message.guild.iconURL());
  message.channel.send(embed);
};
};
};
};
  
  
  
  module.exports.help = MESSAGES.COMMANDS.ECONOMY.MONEY;