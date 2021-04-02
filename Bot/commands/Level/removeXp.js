const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    
    
    const x_mark = client.emojis.resolve('806440609127596032');
    const checkMark = client.emojis.resolve('770980790242377739');

    const user = message.guild.member(message.mentions.users.first()) || message.guild.member(message.author.id);
    const expToRem = parseInt(args[0]);
    if (isNaN(expToRem)) return message.channel.send({embed: {description: `${x_mark}Correct usage : \`${settings.general.prefix}remxp <number>\``}})
    const newExp = userInfo.XP - expToRem
    client.updateGuildUI(message.guild, user, {
      "users.$.XP": newExp
    });
    message.channel.send({embed: {description: `${checkMark}<@${message.author.id}> removed ${expToRem} XP from ${user}`}})
};
  
  
  
  module.exports.help = MESSAGES.COMMANDS.LEVEL.REMXP;