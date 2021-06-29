const {
  MessageEmbed
} = require("discord.js");
const {
  MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;
  if (user == undefined) return message.channel.send({
    embeds: [{
      description: `${x_mark}User not found !`
    }]
  });
  const embed = new MessageEmbed()
    .setDescription(`${message.author}, ${user} avatar :`)
    .setImage(user.displayAvatarURL({ dynamic: true }));

  message.channel.send({embeds: [embed]});
};


module.exports.underCat = MESSAGES.COMMANDS;

module.exports.help = MESSAGES.COMMANDS.UTIL.AVATAR;