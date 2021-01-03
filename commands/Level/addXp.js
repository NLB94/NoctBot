const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, userInfo) => {
    const settings = await client.getGuild(message.guild)
    const user = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author.id);
    const expToAdd = parseInt(args[0]);
    if (isNaN(expToAdd)) return message.channel.send(`Correct usage : \`${settings.general.prefix}addxp <number>\``)
    const newExp = expToAdd + userInfo.XP
    client.updateUI(message.guild, user, {
      "users.$.XP": newExp
    });
    message.channel.send(`<@${message.author.id}> added ${expToAdd} XP to ${user}`)
};
  
  
  
  module.exports.help = MESSAGES.COMMANDS.LEVEL.ADDXP;