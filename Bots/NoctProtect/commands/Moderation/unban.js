const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

  
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

  if (isNaN(args[0])) return message.channel.send({
    embed: {
      description: `${x_mark}Correct usage : \`${settings.general.protectPrefix}unban <user_id>\``
    }
  });
  await client.users.fetch(args[0]).then(async (user) => {
    if (user) {
      const embed = new MessageEmbed()
        .setAuthor(`${user.username}`, user.avatarURL)
        .setColor("#ef0f0f")
        .setDescription(`Unban : ${user} \nModerator : ${message.author}`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());

      message.guild.members.unban(user.id)
        .then(() => {
          message.channel.send(embed);
        })
    }
  }).catch((err) => {
    console.log(err);
    message.channel.send("User not found!");
  });;


};

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNBAN;