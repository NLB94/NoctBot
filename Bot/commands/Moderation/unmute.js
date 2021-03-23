const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const user = args[0].startsWith('<@') && args[0].endsWith('>') ? message.guild.member(message.mentions.users.first()) : (isNaN(args[0]) ? (message.guild.members.cache.find(m => m.tag == args[0])) : message.guild.member(args[0]));
    if (!user) return message.channel.send({embed: {title: 'Invalid Usage', description: `${arrowRight}Correct usage : \`${settings.general.prefix}${module.exports.help.name} ${module.exports.help.usage}\``}});
    let muteRole = settings.moderation.muteRole.toLowerCase() == 'muted' ? message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted') : message.guild.roles.cache.find(r => r.id === settings.moderation.muteRole);
    

    if (!muteRole) {
      muteRole = await message.guild.roles.create({
          data: {
              name: 'Muted',
              color: 'grey',
              permissions: []
          }
      });

   message.guild.channels.cache.forEach(async (channel, id) => {
       await channel.updateOverwrite(muteRole, {
           SEND_MESSAGES: false,
           ADD_REACTIONS: false,
           CONNECT: false
       });
   })
   const roleID = message.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted').id;
       client.updateGuild(message.guild, {
           "moderation.muteRole": roleID
       })
  };
    if (!user.roles.cache.has(muteRole.id)) return message.channel.send("You can't unmute someone who isn't muted.");
    else {user.roles.remove(muteRole.id);
    
    const embedLogs = new MessageEmbed()
    .setAuthor(`${user.user.username}`)
    .setColor("000000")
    .setDescription(`Unmute : <@${user.id}> \nModerator : <@${message.author.id}>`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

        
    const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} is now unmuted`)
    .setColor("#000000");

    message.channel.send(embed);
       if (logs !== undefined) { logs.send(embedLogs);}
   };
}
  
  
  module.exports.help = MESSAGES.COMMANDS.MODERATION.UNMUTE;