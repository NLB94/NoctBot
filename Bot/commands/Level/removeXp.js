const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
    
    
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);

    const user = message.guild.members.resolve(args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author);
    const expToRem = parseInt(args[0]);

    if (user !== message.author && user !== message.member) userInfo = await client.getGuildUser(message.guild, member)

    if (isNaN(expToRem)) return message.channel.send({embed: {description: `${x_mark}Correct usage : \`${settings.general.prefix}remxp <number>\``}})
    const newExp = userInfo.XP - expToRem
    client.updateGuildUI(message.guild, user, {
      "users.$.XP": newExp
    });
    message.channel.send({embed: {description: `${checkMark}<@${message.author.id}> removed ${expToRem} XP from ${user}`}})
};
  

module.exports.underCat = MESSAGES.COMMANDS.LEVEL.MANAGE;
  
module.exports.help = MESSAGES.COMMANDS.LEVEL.MANAGE.REMXP;