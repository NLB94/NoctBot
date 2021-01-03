const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
  const settings = await client.getGuild(message.guild);
    if (isNaN(args[0])) return message.channel.send(`Correct usage : \`${settings.general.prefix}unban <user_id>\``);
    const logs = client.channels.cache.get('789919985307746304');
    const user = await client.users.fetch(args[0]).then(() => {
    if (user) {
    const embed = new MessageEmbed()
    .setAuthor(`${user.username}`, user.avatarURL)
    .setColor("#ef0f0f")
    .setDescription(`Unban : ${user} \nModerator : ${message.author}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

        message.guild.members.unban(user)
          .then(() => {
             logs.send(embed);
          })
      }
    }).catch((err) => {
      message.channel.send("User not found!");
    });;
    
    
    };
  
  module.exports.help = MESSAGES.COMMANDS.MODERATION.UNBAN;