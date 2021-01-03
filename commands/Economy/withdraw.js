const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../util/constants');

module.exports.run = async (client, message, args, userInfo) => {
  const settings = await client.getGuild(message.guild);

  if (isNaN(args[0]) && !args[0].toLowerCase().startsWith('al')) return message.channel.send(`Correct usage : \`${settings.general.prefix}deposit <amount | all>\``);


    const toWith = args[0].toLowerCase().startsWith('al') ? parseInt(userInfo.moneyBank) : parseInt(args[0]);

    if (toWith > userInfo.moneyBank) return message.channel.send(`You have only ${userInfo.moneyBank} in your bank!`);
    
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor('#000000')
      .setTitle('Withdrew from bank')
      .setDescription(`Successfully withdrew ${toWith} from ${message.author}'s bank!`)
      .setFooter(message.guild, message.guild.iconURL())
      .setTimestamp();

      const newBank = userInfo.moneyBank - toWith;
      const newB = userInfo.moneyCash + toWith;

      client.updateUI(message.guild, message.member, {
        "users.$.moneyCash": newB
      });
      client.updateUI(message.guild, message.member, {
        "users.$.moneyBank": newBank
      });

    message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.WITHDRAW;