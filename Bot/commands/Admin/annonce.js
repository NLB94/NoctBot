const { MessageEmbed } = require("discord.js");
const {
  MESSAGES
} = require("../../../util/constants");
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

  const tada = client.emojis.resolve(client.localEmojis.tada),
    warning = client.emojis.resolve(client.localEmojis.warning),
    eyes = client.emojis.resolve(client.localEmojis.alert),
    alert = client.emojis.resolve(client.localEmojis.alert),
    embed = new MessageEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL(), `https://discord.gg/${(await message.guild.fetchInvites()).filter(i => !i.temporary).first().code}`)
      .setTitle(`Choose your roles`)
      .setDescription(` ${tada} - <@&822213564752330792> \n${warning} - <@&822500136176451684> \n${alert} - <@&822500107973820466> \n${eyes} - <@&822500061736337428>`)
      .setFooter(client.user.username, client.user.avatarURL())
      .setTimestamp();

  const channel = await message.guild.channels.resolve('819871741823156265');

  channel.send(embed)
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.ANNONCE;