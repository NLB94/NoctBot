const { MESSAGES } = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, userInfo) => {
    const settings = await client.getGuild(message.guild);
    
    const x_mark = client.emojis.resolve('806440609127596032');
    const checkMark = client.emojis.resolve('770980790242377739');

    const user = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author.id);
    const expToAdd = parseInt(args[0]);
    if (isNaN(expToAdd)) return message.channel.send({embed: {description: `${x_mark}Correct usage : \`${settings.general.prefix}addxp <number>\``}})
    const newExp = expToAdd + userInfo.XP
    client.updateGuildUI(message.guild, user, {
      "users.$.XP": newExp
    });
    message.channel.send({embed: {description: `${checkMark}<@${message.author.id}> added ${expToAdd} XP to ${user}`}})
};
  
  
  
  module.exports.help = MESSAGES.COMMANDS.LEVEL.ADDXP;