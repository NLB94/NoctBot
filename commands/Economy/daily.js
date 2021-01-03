const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../util/constants');

module.exports.run = async (client, message, args, userInfo) => {
  const dailyCd = 8.64e+7;

  if (userInfo == undefined) await client.createUser(message.guild, message.member);
  
  const lastD = userInfo.dailyCd;
  if (lastD !== null && dailyCd - (Date.now() - lastD) > 0) {
    const cdT = dailyCd - (Date.now() - lastD);
    const cdEmbed = new MessageEmbed()
      .setTitle('Daily Cooldown')
      .setDescription(`You have to wait ${Math.floor(cdT / (1000 * 60 * 60) % 24)}h, ${Math.floor(cdT / (1000 * 60) % 60)}m and ${Math.floor(cdT / (1000) % 24)}s before next daily rewards!`)
      .setFooter(message.author.tag, message.author.avatarURL())
      .setTimestamp();
    message.reply(cdEmbed);
  } else {
    const dailyCash = Math.round(Math.floor(Math.random() * 500))
    const msg = `${message.member}, you've got $${dailyCash} for daily cash! Now you have ${Math.floor(userInfo.moneyCash + dailyCash)} on your hand !`;


    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor('#000000')
      .setTitle('Daily Cash')
      .setDescription(msg)
      .setFooter(message.guild, message.guild.iconURL())
      .setTimestamp();

    const newB = userInfo.moneyCash + dailyCash;
    client.updateUI(message.guild, message.member, {
      "users.$.moneyCash": newB
    });
    client.updateUI(message.guild, message.member, { dailyCd: Date.now() });
    message.channel.send(embed);
  };
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.DAILY;