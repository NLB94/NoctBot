const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../util/constants');

module.exports.run = async (client, message, args, userInfo) => {
  const settings = await client.getGuild(message.guild);

  if (isNaN(args[0]) && !args[0].toLowerCase().startsWith('al')) return message.channel.send(`Correct usage : \`${settings.general.prefix}deposit <amount | all>\``);


    const toDep = args[0].toLowerCase().startsWith('al') ? parseInt(userInfo.moneyCash) : parseInt(args[0]);
    
    if (toDep > userInfo.moneyCash) return message.channel.send(`You have only ${userInfo.moneyCash} on your hand!`);

    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor('#000000')
      .setTitle('Deposit to bank')
      .setDescription(`Successfully deposited ${toDep} to ${message.author}'s bank!`)
      .setFooter(message.guild, message.guild.iconURL())
      .setTimestamp();

      const newBank = toDep + userInfo.moneyBank;
      const newB = userInfo.moneyCash - toDep;

      client.updateUI(message.guild, message.member, {
        "users.$.moneyBank": newBank
      });
      client.updateUI(message.guild, message.member, {
        "users.$.moneyCash": newB
      });
    message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.DEPOSIT;