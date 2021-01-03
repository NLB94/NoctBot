const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
  // const settings = await client.getGuild(message.guild)
  // const user = message.guild.member(message.mentions.users.first() || message.author.id);
  // const expToRem = parseInt(args[0]);
  // if (isNaN(expToRem)) return message.channel.send(`Correct usage : \`${settings.general.prefix}remxp <number> {@user}\``)
  // client.remExp(client, user, expToRem);
  // message.channel.send(`<@${message.author.id}> removed ${expToRem} XP from ${user}`)
};
  
  
  
  module.exports.help = MESSAGES.COMMANDS.LEVEL.REMXP;