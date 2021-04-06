const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
  const hourlyCd = 4.32e+7;

  if (userInfo == undefined) await client.createGuildUser(message.guild, message.member);
  
  const lastD = userInfo.cd.hourly;
  if (lastD !== null && hourlyCd - (Date.now() - lastD) > 0) {
    const cdT = hourlyCd - (Date.now() - lastD);
    const cdEmbed = new MessageEmbed()
      .setTitle('Hourly Cooldown')
      .setDescription(`You have to wait ${Math.floor(cdT / (1000 * 60) % 60)}m and ${Math.floor(cdT / (1000) % 24)}s before next hourly rewards!`)
      .setFooter(message.author.tag, message.author.avatarURL())
      .setTimestamp();
    message.reply(cdEmbed);
  } else {
    const hourlyCash = Math.round(Math.floor(Math.random() * 100))
    const msg = `${message.member}, you've got $${hourlyCash} for hourly cash! Now you have ${Math.floor(userInfo.moneyCash + hourlyCash)} on your hand !`;


    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setColor('#000000')
      .setTitle('Hourly Cash')
      .setDescription(msg)
      .setFooter(message.guild, message.guild.iconURL())
      .setTimestamp();

    const newB = userInfo.moneyCash + hourlyCash;
    client.updateGuildUI(message.guild, message.member, {
      "users.$.moneyCash": newB
    });
    client.updateGuildUI(message.guild, message.member, { "users.$.cd.hourly": Date.now() });
    message.channel.send(embed);
  };
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.HOURLY;