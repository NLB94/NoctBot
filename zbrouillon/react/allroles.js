const { Role, MessageEmbed, MessageReaction } = require("discord.js");
 

module.exports.run = (client, message, args) => {
    const reactEmoji = message.guild.emojis.cache.get('770980790242377739');
    const rChannel = client.channels.cache.get('776823872544309259');

    const embed = new MessageEmbed()
    .setTitle("Verification")
    .setDescription("Click on this reaction to get verified!")
    .setColor("#000000");

      rChannel.send(embed).then(async msg => {
      await msg.react(reactEmoji);
    })
  };



module.exports.help = MESSAGES.COMMANDS.REACTIONS.ALLROLES;